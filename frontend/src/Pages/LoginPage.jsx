import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginForm from '../Components/Authorization/LoginForm';
import avatarLogin from '../assets/avatar-login.jpeg'

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h100">
        <Card style={{ width: '18rem' }} className="text-center shadow-sm">
          <Card.Body className="row">
          <Col className="d-flex align-items-center justify-content-center">
            <Image src={avatarLogin} roundedCircle />
          </Col>
            <LoginForm />
          </Card.Body>
          <Card.Footer className="row text-muted p-4">
            <div className="text-center">
              <span className="px-1">{t('login.notAcc')}</span>
              <Link to="/signup">{t('registration.registration')}</Link>
            </div>
          </Card.Footer>
        </Card>
      </Row>
    </Container>
  );
};

export default LoginPage;