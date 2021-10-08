import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => (
  <Navbar className="shadow-sm" bg="white" expand="lg" variant="light">
    <Container>
      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
      <Nav.Link as={Link} to="/login">Login</Nav.Link>
    </Container>
  </Navbar>
);

export default AppNavbar;
