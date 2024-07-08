/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
"use strict";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import EstadisticasService from "../services/estadistica.service.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene la cantidad de pedidos por mes
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getPedidosPorMes(req, res) {
    try {
        const [pedidosPorMes, errorPedidosPorMes] = await EstadisticasService.obtenerPedidosPorMes();
        if (errorPedidosPorMes) return respondError(req, res, 404, errorPedidosPorMes);

        if (pedidosPorMes.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, pedidosPorMes);
        }
    } catch (error) {
        handleError(error, "estadisticas.controller -> getPedidosPorMes");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Obtiene la evolución del stock de productos
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getEvolucionStock(req, res) {
    try {
        const [evolucionStock, errorEvolucionStock] = await EstadisticasService.obtenerEvolucionStock();
        if (errorEvolucionStock) return respondError(req, res, 404, errorEvolucionStock);

        if (evolucionStock.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, evolucionStock);
        }
    } catch (error) {
        handleError(error, "estadisticas.controller -> getEvolucionStock");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Obtiene el stock de productos por categoría
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getStockByCategory(req, res) {
    try {
        const [stockPorCategoria, errorStockPorCategoria] = await EstadisticasService.obtenerStockPorCategoria();
        if (errorStockPorCategoria) return respondError(req, res, 404, errorStockPorCategoria);

        if (stockPorCategoria.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, stockPorCategoria);
        }
    } catch (error) {
        handleError(error, "estadisticas.controller -> getStockByCategory");
        respondError(req, res, 400, error.message);
    }
}

export default {
    getPedidosPorMes,
    getEvolucionStock,
    getStockByCategory,
};
