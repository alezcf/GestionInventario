import React, { useEffect, useState } from 'react';
import { Container, Row, Card, Alert } from 'react-bootstrap';
import inventarioService from '../services/inventario.service';
import InventarioSelector from '../components/InventarioSelector';
import InventarioDetalles from '../components/InventarioDetalles';
import '../css/Inventario.css';

function Inventario() {
    const [inventarioData, setInventarioData] = useState([]);
    const [selectedInventario, setSelectedInventario] = useState(''); // Inicializa con una cadena vacía
    const [selectedCategoria, setSelectedCategoria] = useState(''); // Inicializa con una cadena vacía
    const [categorias, setCategorias] = useState([]); // Para almacenar las categorías disponibles
    const [searchQuery, setSearchQuery] = useState(''); // Para almacenar la búsqueda
    const [stockRange, setStockRange] = useState([0, 100]); // Para almacenar el filtro de rango de stock
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventario = async () => {
            try {
                const data = await inventarioService.getAllInventarios();
                setInventarioData(data);

                // Extraer categorías únicas
                const allCategorias = data.reduce((acc, inventario) => {
                    inventario.productos.forEach(producto => {
                        if (!acc.includes(producto.productoId.categoria)) {
                            acc.push(producto.productoId.categoria);
                        }
                    });
                    return acc;
                }, []);
                setCategorias(allCategorias);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchInventario();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedInventario(event.target.value);
        setSelectedCategoria(''); // Resetear la categoría cuando se selecciona un nuevo inventario
    };

    const handleCategoriaChange = (event) => {
        setSelectedCategoria(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleStockRangeChange = (value) => {
        setStockRange(value);
    };

    let filteredData = inventarioData.find(inv => inv._id === selectedInventario);

    if (filteredData) {
        if (selectedCategoria) {
            filteredData = {
                ...filteredData,
                productos: filteredData.productos.filter(producto => producto.productoId.categoria === selectedCategoria)
            };
        }

        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            filteredData = {
                ...filteredData,
                productos: filteredData.productos.filter(producto => 
                    producto.productoId.nombre.toLowerCase().includes(lowercasedQuery) ||
                    producto.productoId.descripcion.toLowerCase().includes(lowercasedQuery) ||
                    producto.productoId.marca.toLowerCase().includes(lowercasedQuery) ||
                    producto.productoId.categoria.toLowerCase().includes(lowercasedQuery) ||
                    producto.productoId.tipo.toLowerCase().includes(lowercasedQuery)
                )
            };
        }

        filteredData = {
            ...filteredData,
            productos: filteredData.productos.filter(producto => producto.cantidad >= stockRange[0] && producto.cantidad <= stockRange[1])
        };
    }

    return (
        <Container fluid className="inventario-container">
            <Row className="justify-content-md-center">
                <Card className="inventario-card">
                    <Card.Header as="h1" className="inventario-header">Inventario</Card.Header>
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
                                    categorias={categorias}
                                    selectedCategoria={selectedCategoria}
                                    handleCategoriaChange={handleCategoriaChange}
                                    searchQuery={searchQuery}
                                    handleSearchChange={handleSearchChange}
                                    stockRange={stockRange}
                                    handleStockRangeChange={handleStockRangeChange}
                                />
                                {filteredData && (
                                    <InventarioDetalles selectedData={filteredData} />
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
