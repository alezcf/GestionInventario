/* eslint-disable operator-linebreak */
"use strict";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import ProductoService from "../services/producto.service.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los productos
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getProductos(req, res) {
    try {
        const [productos, errorProductos] = await ProductoService.getProductos();
        if (errorProductos) return respondError(req, res, 404, errorProductos);

        if (productos.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, productos);
        }
    } catch (error) {
        handleError(error, "producto.controller -> getProductos");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea un nuevo producto
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createProducto(req, res) {
    try {
        const { body } = req;
        const [newProducto, errorProducto] = await ProductoService.createProducto(body);
        if (errorProducto) return respondError(req, res, 400, errorProducto);

        respondSuccess(req, res, 201, newProducto);
    } catch (error) {
        handleError(error, "producto.controller -> createProducto");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Obtiene un producto por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getProductoById(req, res) {
    try {
        const { params } = req;
        const [producto, errorProducto] = await ProductoService.getProductoById(params.id);
        if (errorProducto) return respondError(req, res, 404, errorProducto);

        respondSuccess(req, res, 200, producto);
    } catch (error) {
        handleError(error, "producto.controller -> getProductoById");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Actualiza un producto por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateProducto(req, res) {
    try {
        const { params, body } = req;
        // eslint-disable-next-line max-len
        const [productoUpdated, errorProducto] = await ProductoService.updateProducto(params.id, body);
        if (errorProducto) return respondError(req, res, 400, errorProducto);

        respondSuccess(req, res, 200, productoUpdated);
    } catch (error) {
        handleError(error, "producto.controller -> updateProducto");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Elimina un producto por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteProducto(req, res) {
    try {
        const { params } = req;
        const [productoDeleted, errorProducto] = await ProductoService.deleteProducto(params.id);
        if (errorProducto) return respondError(req, res, 404, errorProducto);

        respondSuccess(req, res, 200, productoDeleted);
    } catch (error) {
        handleError(error, "producto.controller -> deleteProducto");
        respondError(req, res, 500, error.message);
    }
}

export default {
    getProductos,
    createProducto,
    getProductoById,
    updateProducto,
    deleteProducto,
};
