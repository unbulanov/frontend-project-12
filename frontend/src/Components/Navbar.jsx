import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const Navbars = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return auth.loggedIn ? (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href='/'>{t('nav.logo')}</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end" />
        <Button onClick={auth.logOut}>{t('nav.exit')}</Button>
      </Container>
    </Navbar>
  ) : (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href='/'>{t('nav.logo')}</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navbars;