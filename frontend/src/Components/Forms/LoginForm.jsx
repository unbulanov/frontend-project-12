/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import routes from '../../routes.js';
import useAuth from '../../Hooks/index.jsx';
import { useFormik } from 'formik';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const LoginSchema = yup.object().shape({
    username: yup.string().required('Это обязательное поле'),
    password: yup.string().required('Это обязательное поле'),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    LoginSchema,
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (errors) {
        if (errors.isAxiosError && errors.response.status === 401) {
          setAuthFailed(true);
          return false;
        }
        throw errors;
      }
    },
  });
  const {
    touched, handleSubmit, handleChange, values, errors,
  } = formik;

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Войти</h2>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="username"
          name="username"
          onChange={handleChange}
          ref={inputRef}
          value={values.username}
          type="text"
          isInvalid={(touched.username && !!errors.username) || authFailed}
        />
        <Form.Label htmlFor="username">Имя</Form.Label>
        {!!errors.username && (
          <Form.Control.Feedback type="invalid" tooltip>
            {errors.username && touched.username ? errors.username : null}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          id="password"
          name="password"
          onChange={handleChange}
          value={values.password}
          type="password"
          isInvalid={(touched.password && !!errors.password) || authFailed}
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {errors.password ?? 'Пользователь не найден'}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="w-100 mb-3" variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;