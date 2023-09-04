import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';

const SignUpForm = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const rollbar = useRollbar();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required(t('registration.required'))
      .min(3, t('registration.minMax'))
      .max(20, t('registration.minMax')),
    password: yup
      .string()
      .required(t('registration.required'))
      .min(6, t('registration.passwordLenght')),
    passwordConfirm: yup
      .string()
      .required(t('registration.required'))
      .oneOf([yup.ref('password'), null], t('registration.passwordError')),
  });
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const authResponse = await axios.post(routes.signUp(), values);
        localStorage.setItem('userId', JSON.stringify(authResponse.data));
        auth.logIn();
        navigate('/');
        setSubmitting(false);
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          inputRef.current.select();
          setAuthFailed(true);
          rollbar.error(error);
          return false;
        }

        if (error.isAxiosError && error.response.status === 409) {
          inputRef.current.select();
          setAuthFailed(true);
          setExistingUser(true);
          rollbar.error(error);
          return false;
        }

        throw error;
      }
    },
  });
  const {
    touched, handleSubmit, handleChange, values, errors, isSubmitting,
  } = formik;
  const onChange = (e) => {
    if (existingUser) {
      setExistingUser(false);
    }
    handleChange(e);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">{t('registration.registration')}</h2>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="username"
          name="username"
          onChange={onChange}
          ref={inputRef}
          value={values.username}
          type="text"
          isInvalid={
            (touched.username && !!errors.username)
            || existingUser
            || authFailed
          }
        />
        <Form.Label htmlFor="username">{t('registration.name')}</Form.Label>
        {(existingUser || !!errors.username) && (
          <Form.Control.Feedback type="invalid" tooltip>
            {existingUser ? t('registration.exist') : errors.username}
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
        <Form.Label htmlFor="password">{t('registration.password')}</Form.Label>
        {!!errors.password && (
          <Form.Control.Feedback type="invalid" tooltip>
            {errors.password}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          id="passwordConfirm"
          name="passwordConfirm"
          onChange={handleChange}
          value={values.passwordConfirm}
          type="password"
          isInvalid={
            (touched.passwordConfirm && !!errors.passwordConfirm) || authFailed
          }
        />
        <Form.Label htmlFor="passwordConfirm">{t('registration.confirmPassword')}</Form.Label>
        {!!errors.passwordConfirm && (
          <Form.Control.Feedback type="invalid" tooltip>
            {errors.passwordConfirm}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button disabled={isSubmitting} className="w-100 mb-3" variant="primary" type="submit">
        {t('registration.enter')}
      </Button>
    </Form>
  );
};

export default SignUpForm;