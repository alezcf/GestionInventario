/* eslint-disable operator-linebreak */
"use strict";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import PedidoService from "../services/pedido.service.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los pedidos
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getPedidos(req, res) {
    try {
        const [pedidos, errorPedidos] = await PedidoService.getPedidos();
        if (errorPedidos) return respondError(req, res, 404, errorPedidos);

        if (pedidos.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, pedidos);
        }
    } catch (error) {
        handleError(error, "pedido.controller -> getPedidos");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea un nuevo pedido
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createPedido(req, res) {
    try {
        const { body } = req;
        const [newPedido, errorPedido] = await PedidoService.createPedido(body);
        if (errorPedido) return respondError(req, res, 400, errorPedido);

        respondSuccess(req, res, 201, newPedido);
    } catch (error) {
        handleError(error, "pedido.controller -> createPedido");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Obtiene un pedido por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getPedidoById(req, res) {
    try {
        const { params } = req;
        const [pedido, errorPedido] = await PedidoService.getPedidoById(params.id);
        if (errorPedido) return respondError(req, res, 404, errorPedido);

        respondSuccess(req, res, 200, pedido);
    } catch (error) {
        handleError(error, "pedido.controller -> getPedidoById");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Actualiza un pedido por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updatePedido(req, res) {
    try {
        const { params, body } = req;
        const [pedidoUpdated, errorPedido] = await PedidoService.updatePedido(params.id, body);
        if (errorPedido) return respondError(req, res, 400, errorPedido);

        respondSuccess(req, res, 200, pedidoUpdated);
    } catch (error) {
        handleError(error, "pedido.controller -> updatePedido");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Elimina un pedido por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deletePedido(req, res) {
    try {
        const { params } = req;
        const [pedidoDeleted, errorPedido] = await PedidoService.deletePedido(params.id);
        if (errorPedido) return respondError(req, res, 404, errorPedido);

        respondSuccess(req, res, 200, pedidoDeleted);
    } catch (error) {
        handleError(error, "pedido.controller -> deletePedido");
        respondError(req, res, 500, error.message);
    }
}

export default {
    getPedidos,
    createPedido,
    getPedidoById,
    updatePedido,
    deletePedido,
};
