import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import * as yup from 'yup';
import * as formik from 'formik';
import { Button, Form, Container, Card, Row } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../Hooks/index.jsx";
import routes from '../routes.js';

const LoginPage = () => {
    const auth = useAuth();
    const { Formik } = formik;
    const [authFailed, setAuthFailed] = useState(false);
    const inputRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const LoginSchema = yup.object().shape({
        username: yup.string().required('Это обязательное поле'),
        password: yup.string().required('Это обязательное поле'),
    })
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    return (
        <Container fluid className="h-100">
            <Row className="justify-content-center align-items-center h100">
                <Card style={{ width: '18rem' }} className="text-center">
                    <Card.Body>
                        <Formik
                            initialValues={{
                                username: '',
                                password: '',
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={async (values) => {
                                setAuthFailed(false);
                                try {
                                    const response = await axios.post(routes.loginPath(), values);
                                    localStorage.setItem('userId', JSON.stringify(response.data));
                                    auth.logIn();
                                    const { from } = location.state || { from: { pathname: '/' } };
                                    navigate(from);
                                } catch (err) {
                                    if (err.isAxiosError && err.response.status === 401) {
                                        setAuthFailed(true);
                                        inputRef.current.select();
                                        return;
                                    }
                                    throw err;
                                }
                            }}
                            >
                                {({ handleSubmit, handleChange, values, errors }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <h2 className="text-center mb-4">Войти</h2>
                                        <Form.Group className="form-floating mb-3">
                                            <Form.Control
                                            id="username"
                                            name="username"
                                            onChange={handleChange}
                                            value={values.username}
                                            type="username"
                                            required
                                            isInvalid={!!errors.username}
                                            ref={inputRef}
                                            />
                                            <Form.Label htmlFor="username">Ваш ник</Form.Label>
                                            <Form.Control.Feedback type="invalid" tooltip>{errors.username}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="form-floating mb-4">
                                            <Form.Control
                                            id="password"
                                            name="password"
                                            onChange={handleChange}
                                            value={values.password}
                                            type="password"
                                            required
                                            isInvalid={!!errors.password}
                                            />
                                            <Form.Label htmlFor="password">Пароль</Form.Label>
                                            <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Button variant="primary" className="w-100 mb-3" type="submit">
                                            Войти
                                        </Button>
                                    </Form>
                                )}
                        </Formik>
                    </Card.Body>
                    <Card.Footer>
                        <div className="text-center">
                            <span className="px-1">Нет аккаунта?</span>
                            <Link to="/signup">Регистрация</Link>
                        </div>
                    </Card.Footer>
                </Card>
            </Row>
        </Container>
    );
};

export default LoginPage;