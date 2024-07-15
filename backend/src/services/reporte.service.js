"use strict";
import Reporte from "../models/reporte.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los reportes de la base de datos
 * @returns {Promise} Promesa con el objeto de los reportes
 */
async function getReportes() {
    try {
        const reportes = await Reporte
            .find()
            .populate("rolAsignado")
            .populate("productoAsignado")
            .exec();
        if (!reportes) return [null, "No hay reportes"];
        return [reportes, null];
    } catch (error) {
        handleError(error, "reporte.service -> getReportes");
        return [null, error];
    }
}

/**
 * Crea un nuevo reporte en la base de datos
 * @param {Object} reporte Objeto de reporte
 * @returns {Promise} Promesa con el objeto de reporte creado
 */
async function createReporte(reporte) {
    try {
        const newReporte = new Reporte(reporte);
        await newReporte.save();
        return [newReporte, null];
    } catch (error) {
        handleError(error, "reporte.service -> createReporte");
        return [null, error];
    }
}

/**
 * Obtiene un reporte por su id de la base de datos
 * @param {string} id Id del reporte
 * @returns {Promise} Promesa con el objeto de reporte
 */
async function getReporteById(id) {
    try {
        const reporte = await Reporte
        .findById(id)
        .populate("rolAsignado")
        .populate("productoAsignado")
        .exec();
        if (!reporte) return [null, "El reporte no existe"];
        return [reporte, null];
    } catch (error) {
        handleError(error, "reporte.service -> getReporteById");
        return [null, error];
    }
}

/**
 * Actualiza un reporte por su id en la base de datos
 * @param {string} id Id del reporte
 * @param {Object} reporte Objeto de reporte
 * @returns {Promise} Promesa con el objeto de reporte actualizado
 */
async function updateReporte(id, reporte) {
    try {
        const reporteUpdated = await Reporte
            .findByIdAndUpdate(id, reporte, { new: true })
            .exec();
        if (!reporteUpdated) return [null, "El reporte no existe"];
        return [reporteUpdated, null];
    } catch (error) {
        handleError(error, "reporte.service -> updateReporte");
        return [null, error];
    }
}

/**
 * Elimina un reporte por su id de la base de datos
 * @param {string} id Id del reporte
 * @returns {Promise} Promesa con el objeto de reporte eliminado
 */
async function deleteReporte(id) {
    try {
        const reporteDeleted = await Reporte.findByIdAndDelete(id).exec();
        if (!reporteDeleted) return [null, "El reporte no existe"];
        return [reporteDeleted, null];
    } catch (error) {
        handleError(error, "reporte.service -> deleteReporte");
        return [null, error];
    }
}

export default {
    getReportes,
    createReporte,
    getReporteById,
    updateReporte,
    deleteReporte,
};
