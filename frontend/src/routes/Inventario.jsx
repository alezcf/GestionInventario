// src/routes/Inventario.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import inventarioService from '../services/inventario.service';
import InventarioSelector from '../components/InventarioSelector';
import InventarioDetalles from '../components/InventarioDetalles';
import '../css/Inventario.css';

function Inventario() {
    const [inventarioData, setInventarioData] = useState([]);
    const [selectedInventario, setSelectedInventario] = useState(''); // Inicializa con una cadena vacía
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventario = async () => {
            try {
                const data = await inventarioService.getAllInventarios();
                console.log("Data retornada = ", data[0].productos);
                setInventarioData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchInventario();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedInventario(event.target.value);
    };

    const selectedData = inventarioData.find(inv => inv._id === selectedInventario);
    console.log("Data retornada = ",selectedData);
    return (
        <Container fluid className="inventario-container">
            <Row className="justify-content-md-center">
                    <Card className="inventario-card">
                        <Card.Header as="h" className="inventario-header">Inventario</Card.Header>
                        <Card.Body>
                            {error ? (
                                <Alert variant="danger" className="text-center">
                                    Error: {error}
                                </Alert>
                            ) : (
                                <>
                                    <InventarioSelector
                                        inventarioData={inventarioData}
                                        selectedInventario={selectedInventario}
                                        handleSelectChange={handleSelectChange}
                                    />
                                    {selectedData && (
                                        <InventarioDetalles selectedData={selectedData} />
                                    )}
                                </>
                            )}
                        </Card.Body>
                    </Card>
            </Row>
        </Container>
    );
}

export default Inventario;
