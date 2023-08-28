import React from "react";
import { Card, Container, Row } from "react-bootstrap";
import SignUpForm from "./Forms/SignUpForm";

const SignUpPage = () => (
    <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h100">
            <Card style={{ width: '18rem' }} className="text-center shadow-sm">
                <Card.Body className="row">
                    <SignUpForm />
                </Card.Body>
            </Card>
        </Row>
    </Container>
);

export default SignUpPage;