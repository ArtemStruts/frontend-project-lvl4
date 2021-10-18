import React from 'react';
import {
  Navbar,
  Container,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('buttons.logout')}</Button>
      : null
  );
};

const AppNavbar = () => (
  <Navbar className="shadow-sm" bg="white" expand="lg" variant="light">
    <Container>
      <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
      <AuthButton />
    </Container>
  </Navbar>
);

export default AppNavbar;
