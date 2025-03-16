import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Si estás usando react-router-dom para navegación
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { logoutUser } from '../services/authService';
import '../styles/navbar.css'

const NavigationBar = () => {

    const navigate = useNavigate();  // Hook para redirigir al login

    const handleLogout = () => {
      logoutUser();  // Llama al logout de authService
      navigate('/login');  // Redirige al login
    };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">Tareas de JkTic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/dashboard" className="nav-item-spacing">Inicio</Nav.Link>

            <NavDropdown title="Usuario" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
