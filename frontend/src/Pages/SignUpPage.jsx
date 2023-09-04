import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import SignUpForm from '../Components/Authorization/SignUpForm';
import avatarSignUp from '../assets/avatar-auth.jpg';

const SignUpPage = () => (
  <Container fluid className="h-100">
    <Row className=" justify-content-center align-items-center h-100">
      <Card style={{ width: '18rem' }} className="text-center shadow-sm">
        <Card.Body className="row">
          <Col className="d-flex align-items-center justify-content-center">
            <Image src={avatarSignUp} roundedCircle />
          </Col>
          <SignUpForm />
        </Card.Body>
      </Card>
    </Row>
  </Container>
);

export default SignUpPage;