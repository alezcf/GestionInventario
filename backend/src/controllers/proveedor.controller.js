/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
"use strict";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import ProveedorService from "../services/proveedor.service.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los proveedores
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getProveedores(req, res) {
    try {
        const [proveedores, errorProveedores] = await ProveedorService.getProveedores();
        if (errorProveedores) return respondError(req, res, 404, errorProveedores);

        if (proveedores.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, proveedores);
        }
    } catch (error) {
        handleError(error, "proveedor.controller -> getProveedores");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea un nuevo proveedor
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createProveedor(req, res) {
    try {
        const { body } = req;
        const [newProveedor, errorProveedor] = await ProveedorService.createProveedor(body);
        if (errorProveedor) return respondError(req, res, 400, errorProveedor);

        respondSuccess(req, res, 201, newProveedor);
    } catch (error) {
        handleError(error, "proveedor.controller -> createProveedor");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Obtiene un proveedor por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getProveedorById(req, res) {
    try {
        const { params } = req;
        const [proveedor, errorProveedor] = await ProveedorService.getProveedorById(params.id);
        if (errorProveedor) return respondError(req, res, 404, errorProveedor);

        respondSuccess(req, res, 200, proveedor);
    } catch (error) {
        handleError(error, "proveedor.controller -> getProveedorById");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Actualiza un proveedor por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateProveedor(req, res) {
    try {
        const { params, body } = req;
        // eslint-disable-next-line max-len
        const [proveedorUpdated, errorProveedor] = await ProveedorService.updateProveedor(params.id, body);
        if (errorProveedor) return respondError(req, res, 400, errorProveedor);

        respondSuccess(req, res, 200, proveedorUpdated);
    } catch (error) {
        handleError(error, "proveedor.controller -> updateProveedor");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Elimina un proveedor por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteProveedor(req, res) {
    try {
        const { params } = req;
        const [proveedorDeleted, errorProveedor] = await ProveedorService.deleteProveedor(params.id);
        if (errorProveedor) return respondError(req, res, 404, errorProveedor);

        respondSuccess(req, res, 200, proveedorDeleted);
    } catch (error) {
        handleError(error, "proveedor.controller -> deleteProveedor");
        respondError(req, res, 500, error.message);
    }
}

export default {
    getProveedores,
    createProveedor,
    getProveedorById,
    updateProveedor,
    deleteProveedor,
};
