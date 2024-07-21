import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Image, Alert, Button } from 'react-bootstrap';
import productoService from '../services/producto.service';
import '../css/ProductoDetalles.css';

const BASE_URL = import.meta.env.VITE_BASE_URL.replace('/api', '');

const ProductoDetalles = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const data = await productoService.getProducto(id);
                console.log("Data recibida por producto = ", data);
                setProducto(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchProducto();
    }, [id]);

    if (error) {
        return <Alert variant="danger" className="text-center">Error: {error}</Alert>;
    }

    if (!producto) {
        return <div>Loading...</div>;
    }

    const imageUrl = producto.imagen.replace('src', '');

    return (
        <Container>
            <Card.Body className="producto-detalles-body">
                <Row>
                    <Col md={4} className="text-center">
                        <Image
                            className="detalle-producto-imagen"
                            src={`${BASE_URL}${imageUrl}`}
                            alt={producto.nombre}
                            fluid
                        />
                        <Button variant="primary" className="editar-producto-boton">Editar Producto</Button>
                    </Col>
                    <Col md={8} className="producto-detalles-info">
                        <Row className="atributo">
                            <Col md={6}>
                                <h3>Nombre</h3>
                                <p>{producto.nombre}</p>
                            </Col>
                            <Col md={6}>
                                <h3>Descripción</h3>
                                <p>{producto.descripcion}</p>
                            </Col>
                        </Row>
                        <Row className="atributo">
                            <Col md={6}>
                                <h3>Marca</h3>
                                <p>{producto.marca}</p>
                            </Col>
                            <Col md={6}>
                                <h3>Precio</h3>
                                <p>${producto.precio}</p>
                            </Col>
                        </Row>
                        <Row className="atributo">
                            <Col md={6}>
                                <h3>Volumen </h3>
                                <p>{producto.cantidad} {producto.unidadMedida}</p>
                            </Col>
                            <Col md={6}>
                                <h3>Categoría</h3>
                                <p>{producto.categoria}</p>
                            </Col>
                        </Row>
                        <Row className="atributo">
                            <Col md={6}>
                                <h3>Tipo</h3>
                                <p>{producto.tipo}</p>
                            </Col>
                            <Col md={6}>
                                <h3>Código de Barras</h3>
                                <p>{producto.codigoBarras}</p>
                            </Col>
                        </Row>
                        <Row className="atributo">
                            {producto.proveedor && (
                                <Col md={6}>
                                    <h3>Proveedor</h3>
                                    <p>{producto.proveedor}</p>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Container>
    );
};

export default ProductoDetalles;
