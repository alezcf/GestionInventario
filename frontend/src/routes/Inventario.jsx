import React, { useEffect, useState } from 'react';
import { Container, Row, Card, Alert } from 'react-bootstrap';
import inventarioService from '../services/inventario.service';
import InventarioSelector from '../components/InventarioSelector';
import InventarioDetalles from '../components/InventarioDetalles';
import '../css/Inventario.css';

function Inventario() {
    const [inventarioData, setInventarioData] = useState([]);
    const [selectedInventario, setSelectedInventario] = useState(''); 
    const [selectedCategoria, setSelectedCategoria] = useState(''); 
    const [categorias, setCategorias] = useState([]); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const [stockRange, setStockRange] = useState([0, 100]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventario = async () => {
            try {
                const data = await inventarioService.getAllInventarios();
                setInventarioData(data);
    
                // Extraer categorías únicas
                const allCategorias = extractCategorias(data);
                setCategorias(allCategorias);
            } catch (error) {
                setError(error.message);
            }
        };
    
        fetchInventario();
    }, []);
    
    const extractCategorias = (data) => {
        return data.reduce((acc, inventario) => {
            inventario.productos.forEach(addCategoriaIfUnique.bind(null, acc));
            return acc;
        }, []);
    };
    
    const addCategoriaIfUnique = (acc, producto) => {
        if (!acc.includes(producto.productoId.categoria)) {
            acc.push(producto.productoId.categoria);
        }
    };

    const handleSelectChange = (event) => {
        setSelectedInventario(event.target.value);
        setSelectedCategoria(''); // Resetear la categoría cuando se selecciona un nuevo inventario
        resetPage(); // Resetear la página a 1
    };

    const handleCategoriaChange = (event) => {
        setSelectedCategoria(event.target.value);
        resetPage(); // Resetear la página a 1
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        resetPage(); // Resetear la página a 1
    };

    const handleStockRangeChange = (value) => {
        setStockRange(value);
    };

    const resetPage = () => {
        setCurrentPage(1);
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
                                    resetPage={resetPage} // Pasar la función resetPage
                                />
                                {filteredData && (
                                    <InventarioDetalles selectedData={filteredData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
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
