"use strict";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import InventarioService from "../services/inventario.service.js";
import { handleError } from "../utils/errorHandler.js";
import { inventarioBodySchema, inventarioIdSchema } from "../schema/inventario.schema.js";

/**
 * Obtiene todos los inventarios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getInventarios(req, res) {
    try {
        const [inventarios, errorInventarios] = await InventarioService.getInventarios();
        if (errorInventarios) return respondError(req, res, 404, errorInventarios);

        if (inventarios.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, inventarios);
        }
    } catch (error) {
        handleError(error, "inventario.controller -> getInventarios");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea un nuevo inventario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createInventario(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = inventarioBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newInventario, errorInventario] = await InventarioService.createInventario(body);
        if (errorInventario) return respondError(req, res, 400, errorInventario);

        respondSuccess(req, res, 201, newInventario);
    } catch (error) {
        handleError(error, "inventario.controller -> createInventario");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Obtiene un inventario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getInventarioById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = inventarioIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [inventario, errorInventario] = await InventarioService.getInventarioById(params.id);
        if (errorInventario) return respondError(req, res, 404, errorInventario);

        respondSuccess(req, res, 200, inventario);
    } catch (error) {
        handleError(error, "inventario.controller -> getInventarioById");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Actualiza un inventario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateInventario(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = inventarioIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = inventarioBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [inventarioUpdated, errorInventario] = await InventarioService.updateInventario(
            params.id,
            body,
        );
        if (errorInventario) return respondError(req, res, 400, errorInventario);

        respondSuccess(req, res, 200, inventarioUpdated);
    } catch (error) {
        handleError(error, "inventario.controller -> updateInventario");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Elimina un inventario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteInventario(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = inventarioIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [inventarioDeleted, errorInventario] = await InventarioService.deleteInventario(
            params.id,
        );
        if (errorInventario) return respondError(req, res, 404, errorInventario);

        respondSuccess(req, res, 200, inventarioDeleted);
    } catch (error) {
        handleError(error, "inventario.controller -> deleteInventario");
        respondError(req, res, 500, error.message);
    }
}

export default {
    getInventarios,
    createInventario,
    getInventarioById,
    updateInventario,
    deleteInventario,
};
