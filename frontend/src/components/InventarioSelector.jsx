// src/components/InventarioSelector.jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../css/InventarioSelector.css'; // Asegúrate de importar los estilos específicos para el selector

const InventarioSelector = ({ inventarioData, selectedInventario, handleSelectChange }) => {
    return (
        <Form.Group controlId="inventarioSelect" className="mb-4 selector-group">
            <Form.Control 
                as="select" 
                value={selectedInventario} 
                onChange={handleSelectChange} 
                className="selector-control"
                style={{ textAlign: 'center' }}
            >
                <option value="" style={{ textAlign: 'center' }}>Selecciona un Inventario</option>
                {inventarioData.map((inventario) => (
                    <option key={inventario._id} value={inventario._id} className="selector-option">
                        {inventario._id}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

InventarioSelector.propTypes = {
    inventarioData: PropTypes.array.isRequired,
    selectedInventario: PropTypes.string.isRequired,
    handleSelectChange: PropTypes.func.isRequired
};

export default InventarioSelector;
