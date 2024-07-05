"use strict";
import Proveedor from "../models/proveedor.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los proveedores de la base de datos
 * @returns {Promise} Promesa con el objeto de los proveedores
 */
async function getProveedores() {
    try {
        const proveedores = await Proveedor.find().exec();
        if (!proveedores) return [null, "No hay proveedores"];
        return [proveedores, null];
    } catch (error) {
        handleError(error, "proveedor.service -> getProveedores");
        return [null, error];
    }
}

/**
 * Crea un nuevo proveedor en la base de datos
 * @param {Object} proveedor Objeto de proveedor
 * @returns {Promise} Promesa con el objeto de proveedor creado
 */
async function createProveedor(proveedor) {
    try {
        const newProveedor = new Proveedor(proveedor);
        await newProveedor.save();
        return [newProveedor, null];
    } catch (error) {
        handleError(error, "proveedor.service -> createProveedor");
        return [null, error];
    }
}

/**
 * Obtiene un proveedor por su id de la base de datos
 * @param {string} id Id del proveedor
 * @returns {Promise} Promesa con el objeto de proveedor
 */
async function getProveedorById(id) {
    try {
        const proveedor = await Proveedor.findById(id).exec();
        if (!proveedor) return [null, "El proveedor no existe"];
        return [proveedor, null];
    } catch (error) {
        handleError(error, "proveedor.service -> getProveedorById");
        return [null, error];
    }
}

/**
 * Actualiza un proveedor por su id en la base de datos
 * @param {string} id Id del proveedor
 * @param {Object} proveedor Objeto de proveedor
 * @returns {Promise} Promesa con el objeto de proveedor actualizado
 */
async function updateProveedor(id, proveedor) {
    try {
        const proveedorUpdated = await Proveedor
            .findByIdAndUpdate(id, proveedor, { new: true })
            .exec();
        if (!proveedorUpdated) return [null, "El proveedor no existe"];
        return [proveedorUpdated, null];
    } catch (error) {
        handleError(error, "proveedor.service -> updateProveedor");
        return [null, error];
    }
}

/**
 * Elimina un proveedor por su id de la base de datos
 * @param {string} id Id del proveedor
 * @returns {Promise} Promesa con el objeto de proveedor eliminado
 */
async function deleteProveedor(id) {
    try {
        const proveedorDeleted = await Proveedor.findByIdAndDelete(id).exec();
        if (!proveedorDeleted) return [null, "El proveedor no existe"];
        return [proveedorDeleted, null];
    } catch (error) {
        handleError(error, "proveedor.service -> deleteProveedor");
        return [null, error];
    }
}

export default {
    getProveedores,
    createProveedor,
    getProveedorById,
    updateProveedor,
    deleteProveedor,
};
