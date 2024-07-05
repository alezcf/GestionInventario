/* eslint-disable max-len */
"use strict";
import Inventario from "../models/inventario.model.js";
import Producto from "../models/producto.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los inventarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los inventarios
 */
async function getInventarios() {
    try {
        const inventarios = await Inventario.find().populate("productos").exec();
        if (!inventarios) return [null, "No hay inventarios"];
        return [inventarios, null];
    } catch (error) {
        handleError(error, "inventario.service -> getInventarios");
        return [null, error];
    }
}

/**
 * Crea un nuevo inventario en la base de datos
 * @param {Object} inventario Objeto de inventario
 * @returns {Promise} Promesa con el objeto de inventario creado
 */
async function createInventario(inventario) {
    try {
        // Verificar si los productos existen
        for (const productoId of inventario.productos) {
            const productoExists = await Producto.findById(productoId).exec();
            if (!productoExists) return [null, `Producto con id ${productoId} no existe`];
        }

        const newInventario = new Inventario(inventario);
        await newInventario.save();
        return [newInventario, null];
    } catch (error) {
        handleError(error, "inventario.service -> createInventario");
        return [null, error];
    }
}

/**
 * Obtiene un inventario por su id de la base de datos
 * @param {string} id Id del inventario
 * @returns {Promise} Promesa con el objeto de inventario
 */
async function getInventarioById(id) {
    try {
        const inventario = await Inventario.findById(id).populate("productos").exec();
        if (!inventario) return [null, "El inventario no existe"];
        return [inventario, null];
    } catch (error) {
        handleError(error, "inventario.service -> getInventarioById");
        return [null, error];
    }
}

/**
 * Actualiza un inventario por su id en la base de datos
 * @param {string} id Id del inventario
 * @param {Object} inventario Objeto de inventario
 * @returns {Promise} Promesa con el objeto de inventario actualizado
 */
async function updateInventario(id, inventario) {
    try {
        // Verificar si los productos existen
        if (inventario.productos) {
            for (const productoId of inventario.productos) {
                const productoExists = await Producto.findById(productoId).exec();
                if (!productoExists) return [null, `Producto con id ${productoId} no existe`];
            }
        }

        const inventarioUpdated = await Inventario.findByIdAndUpdate(id, inventario, { new: true }).exec();
        if (!inventarioUpdated) return [null, "El inventario no existe"];
        return [inventarioUpdated, null];
    } catch (error) {
        handleError(error, "inventario.service -> updateInventario");
        return [null, error];
    }
}

/**
 * Elimina un inventario por su id de la base de datos
 * @param {string} id Id del inventario
 * @returns {Promise} Promesa con el objeto de inventario eliminado
 */
async function deleteInventario(id) {
    try {
        const inventarioDeleted = await Inventario.findByIdAndDelete(id).exec();
        if (!inventarioDeleted) return [null, "El inventario no existe"];
        return [inventarioDeleted, null];
    } catch (error) {
        handleError(error, "inventario.service -> deleteInventario");
        return [null, error];
    }
}

export default {
    getInventarios,
    createInventario,
    getInventarioById,
    updateInventario,
    deleteInventario,
};
