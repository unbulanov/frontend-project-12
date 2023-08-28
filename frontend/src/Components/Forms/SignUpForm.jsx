import axios from "axios";
import { useEffect, useRef, useState } from "react";
import * as yup from 'yup';
import useAuth from "../../Hooks/index.jsx";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import routes from "../../routes.js";
import { Button, Form } from "react-bootstrap";

const SignUpForm = () => {
    const [authFailed, setAuthFailed] = useState(false);
    const [userFailed, setUserFailed] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate;
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    const signUpSchema = yup.object().shape({
        username: yup
            .string()
            .required('Это обязательное поле')
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов'),
        password: yup
            .string()
            .required('Это обязательное поле')
            .min(6, 'Минимум 6 символов'),
        passwordConfirm: yup
            .string()
            .required('Это обязательное поле')
            .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      });
    const formik = useFormik({
        signUpSchema,
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
                    return false;
                }
                if (error.isAxiosError && error.response.status === 409) {
                    inputRef.current.select();
                    setUserFailed(true);
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
        if (userFailed) {
            setUserFailed(false);
        }
        handleChange(e);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Регистрация</h2>
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
                      || userFailed
                      || authFailed
                    }
                />
                <Form.Label htmlFor="username">Имя</Form.Label>
                {(userFailed || !!errors.username) && (
                    <Form.Control.Feedback type="invalid" tooltip>
                        {userFailed ? 'Пользователь с таким именем существует' : errors.username}
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
                <Form.Label htmlFor="passwordConfirm">Потвердите пароль</Form.Label>
                {!!errors.passwordConfirm && (
                    <Form.Control.Feedback type="invalid" tooltip>
                        {errors.passwordConfirm}
                    </Form.Control.Feedback>
                )}
            </Form.Group>
            <Button disabled={isSubmitting} className="w-100 mb-3" variant="primary" type="submit">
                Зарегистрироваться
            </Button>
        </Form>
    );
};

export default SignUpForm;