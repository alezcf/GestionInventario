import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';
import { Navbar as BootstrapNavbar, Nav, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css'; // Importa los estilos específicos para Navbar

// Importa la imagen del logo
import BotilleriaLogo from '../images/BotilleriaLogo.png';

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <BootstrapNavbar variant="dark" expand="lg" className="navbar">
      <Container fluid>
        <BootstrapNavbar.Brand href="/">
          <img
            src={BotilleriaLogo}
            alt="Logo de Mi Aplicación"
            className="brand-logo"
          />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto nav-links">
            <Nav.Link href="/" className="nav-link">Inicio</Nav.Link>
            <Nav.Link href="/user-management" className="nav-link">Gestión de Usuarios</Nav.Link>
            <Nav.Link href="/inventario" className="nav-link">Gestión de Inventario</Nav.Link>
            <Nav.Link href="/reports" className="nav-link">Reportes</Nav.Link>
            <div className="user-info">
              <Button variant="outline-light" className="custom-button" onClick={handleLogout}>Cerrar sesión</Button>
            </div>
          </Nav>

        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
