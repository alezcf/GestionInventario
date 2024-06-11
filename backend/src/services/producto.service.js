"use strict";
import Producto from "../models/producto.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los productos de la base de datos
 * @returns {Promise} Promesa con el objeto de los productos
 */
async function getProductos() {
    try {
        const productos = await Producto.find().exec();
        if (!productos) return [null, "No hay productos"];
        return [productos, null];
    } catch (error) {
        handleError(error, "producto.service -> getProductos");
        return [null, error];
    }
}

/**
 * Crea un nuevo producto en la base de datos
 * @param {Object} producto Objeto de producto
 * @returns {Promise} Promesa con el objeto de producto creado
 */
async function createProducto(producto) {
    try {
        const newProducto = new Producto(producto);
        await newProducto.save();
        return [newProducto, null];
    } catch (error) {
        handleError(error, "producto.service -> createProducto");
        return [null, error];
    }
}

/**
 * Obtiene un producto por su id de la base de datos
 * @param {string} id Id del producto
 * @returns {Promise} Promesa con el objeto de producto
 */
async function getProductoById(id) {
    try {
        const producto = await Producto.findById(id).exec();
        if (!producto) return [null, "El producto no existe"];
        return [producto, null];
    } catch (error) {
        handleError(error, "producto.service -> getProductoById");
        return [null, error];
    }
}

/**
 * Actualiza un producto por su id en la base de datos
 * @param {string} id Id del producto
 * @param {Object} producto Objeto de producto
 * @returns {Promise} Promesa con el objeto de producto actualizado
 */
async function updateProducto(id, producto) {
    try {
        const productoUpdated = await Producto
            .findByIdAndUpdate(id, producto, { new: true })
            .exec();
        if (!productoUpdated) return [null, "El producto no existe"];
        return [productoUpdated, null];
    } catch (error) {
        handleError(error, "producto.service -> updateProducto");
        return [null, error];
    }
}

/**
 * Elimina un producto por su id de la base de datos
 * @param {string} id Id del producto
 * @returns {Promise} Promesa con el objeto de producto eliminado
 */
async function deleteProducto(id) {
    try {
        const productoDeleted = await Producto.findByIdAndDelete(id).exec();
        if (!productoDeleted) return [null, "El producto no existe"];
        return [productoDeleted, null];
    } catch (error) {
        handleError(error, "producto.service -> deleteProducto");
        return [null, error];
    }
}

export default {
    getProductos,
    createProducto,
    getProductoById,
    updateProducto,
    deleteProducto,
};

