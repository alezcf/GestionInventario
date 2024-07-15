"use strict";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import ReporteService from "../services/reporte.service.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los reportes
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getReportes(req, res) {
    try {
        const [reportes, errorReportes] = await ReporteService.getReportes();
        if (errorReportes) return respondError(req, res, 404, errorReportes);

        if (reportes.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, reportes);
        }
    } catch (error) {
        handleError(error, "reporte.controller -> getReportes");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea un nuevo reporte
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createReporte(req, res) {
    try {
        const [reporte, errorReporte] = await ReporteService.createReporte(req.body);
        if (errorReporte) return respondError(req, res, 400, errorReporte);

        respondSuccess(req, res, 201, reporte);
    } catch (error) {
        handleError(error, "reporte.controller -> createReporte");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Obtiene un reporte por su ID
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getReporteById(req, res) {
    try {
        const [reporte, errorReporte] = await ReporteService.getReporteById(req.params.id);
        if (errorReporte) return respondError(req, res, 404, errorReporte);

        respondSuccess(req, res, 200, reporte);
    } catch (error) {
        handleError(error, "reporte.controller -> getReporteById");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Actualiza un reporte por su ID
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateReporte(req, res) {
    try {
        const [reporte, errorReporte] = await ReporteService.updateReporte(req.params.id, req.body);
        if (errorReporte) return respondError(req, res, 404, errorReporte);

        respondSuccess(req, res, 200, reporte);
    } catch (error) {
        handleError(error, "reporte.controller -> updateReporte");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Elimina un reporte por su ID
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteReporte(req, res) {
    try {
        const [reporte, errorReporte] = await ReporteService.deleteReporte(req.params.id);
        if (errorReporte) return respondError(req, res, 404, errorReporte);

        respondSuccess(req, res, 200, reporte);
    } catch (error) {
        handleError(error, "reporte.controller -> deleteReporte");
        respondError(req, res, 400, error.message);
    }
}

export default {
    getReportes,
    createReporte,
    getReporteById,
    updateReporte,
    deleteReporte,
};
