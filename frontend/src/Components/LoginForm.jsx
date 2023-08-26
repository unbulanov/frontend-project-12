import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import * as formik from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import routes from '../routes.js';
import useAuth from '../Hooks/index.jsx';

const LoginForm = () => {
  const { Formik } = formik;
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
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        setAuthFailed(false);
        try {
          const responce = await axios.post(routes.loginPath(), values);
          localStorage.setItem('userId', JSON.stringify(responce.data));
          auth.logIn();
          const { from } = location.state || { from: { pathname: '/' } };
          navigate(from);
        } catch (errors) {
          if (errors.isAxiosError && errors.responce.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
            return;
          }
          throw errors;
        }
      }}
    >
      {({
        handleSubmit, handleChange, values, errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Войти</h2>
          <Form.Group className="form-floating mb-3">
            <Form.Control id="username" name="username" onChange={handleChange} value={values.username} type="username" isInvalid={!!errors.username} ref={inputRef} />
            <Form.Label htmlFor="username">Ваш ник</Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>{errors.username}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control id="password" name="password" onChange={handleChange} value={values.password} type="password" isInvalid={!!errors.password} />
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" className="w-100 mb-3" type="submit">
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;