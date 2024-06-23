import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/Dashboard.css';
import '../css/Buttons.css';

function Dashboard() {
    return (
        <Container fluid className="dashboard-container">
        <Row className="my-4">
            <Col>
            <h1 className="text-center">Panel de Control</h1>
            </Col>
        </Row>
        <Row>
            <Col md={6} lg={4}>
            <Card className="mb-4 dashboard-card inventory-card">
                <Card.Body>
                <Card.Title>Resumen de Inventario</Card.Title>
                <Card.Text>
                    Niveles actuales de inventario, productos con bajo stock y productos más vendidos.
                </Card.Text>
                <button type="submit" className="signup-button">Ver más</button>
                </Card.Body>
            </Card>
            </Col>
            <Col md={6} lg={4}>
            <Card className="mb-4 dashboard-card alerts-card">
                <Card.Body>
                <Card.Title>Alertas y Notificaciones</Card.Title>
                <Card.Text>
                    Alertas de reabastecimiento y solicitudes de nuevos registros.
                </Card.Text>
                <button type="submit" className="signup-button">Ver más</button>
                </Card.Body>
            </Card>
            </Col>
            <Col md={6} lg={4}>
            <Card className="mb-4 dashboard-card stats-card">
                <Card.Body>
                <Card.Title>Estadísticas Clave</Card.Title>
                <Card.Text>
                    Gráficas de ventas diarias, semanales y mensuales.
                </Card.Text>
                <button type="submit" className="signup-button">Ver más</button>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
            <Card className="mb-4 dashboard-card profile-card">
                <Card.Body>
                <Card.Title>Perfil del Usuario</Card.Title>
                <Card.Text>
                    Información básica del usuario.
                </Card.Text>
                <button type="submit" className="signup-button">Ver</button>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    );
}

export default Dashboard;
