/* eslint-disable max-len */
"use strict";
import Pedido from "../models/pedido.model.js";
import Proveedor from "../models/proveedor.model.js";
import Producto from "../models/producto.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los pedidos de la base de datos
 * @returns {Promise} Promesa con el objeto de los pedidos
 */
async function getPedidos() {
    try {
        const pedidos = await Pedido.find().populate("proveedor").populate("productos.productoId").exec();
        if (!pedidos) return [null, "No hay pedidos"];
        return [pedidos, null];
    } catch (error) {
        handleError(error, "pedido.service -> getPedidos");
        return [null, error];
    }
}

/**
 * Crea un nuevo pedido en la base de datos
 * @param {Object} pedido Objeto de pedido
 * @returns {Promise} Promesa con el objeto de pedido creado
 */
async function createPedido(pedido) {
    try {
        // Verificar si el proveedor existe
        const proveedorExists = await Proveedor.findById(pedido.proveedor).exec();
        if (!proveedorExists) return [null, "Proveedor no existe"];

        // Verificar si los productos existen
        for (const item of pedido.productos) {
            const productoExists = await Producto.findById(item.productoId).exec();
            if (!productoExists) return [null, `Producto con id ${item.productoId} no existe`];
        }

        const newPedido = new Pedido(pedido);
        await newPedido.save();
        return [newPedido, null];
    } catch (error) {
        handleError(error, "pedido.service -> createPedido");
        return [null, error];
    }
}

/**
 * Obtiene un pedido por su id de la base de datos
 * @param {string} id Id del pedido
 * @returns {Promise} Promesa con el objeto de pedido
 */
async function getPedidoById(id) {
    try {
        const pedido = await Pedido.findById(id).populate("proveedor").populate("productos.productoId").exec();
        if (!pedido) return [null, "El pedido no existe"];
        return [pedido, null];
    } catch (error) {
        handleError(error, "pedido.service -> getPedidoById");
        return [null, error];
    }
}

/**
 * Actualiza un pedido por su id en la base de datos
 * @param {string} id Id del pedido
 * @param {Object} pedido Objeto de pedido
 * @returns {Promise} Promesa con el objeto de pedido actualizado
 */
async function updatePedido(id, pedido) {
    try {
        // Verificar si el proveedor existe
        if (pedido.proveedor) {
            const proveedorExists = await Proveedor.findById(pedido.proveedor).exec();
            if (!proveedorExists) return [null, "Proveedor no existe"];
        }

        // Verificar si los productos existen
        if (pedido.productos) {
            for (const item of pedido.productos) {
                const productoExists = await Producto.findById(item.productoId).exec();
                if (!productoExists) return [null, `Producto con id ${item.productoId} no existe`];
            }
        }

        const pedidoUpdated = await Pedido.findByIdAndUpdate(id, pedido, { new: true }).exec();
        if (!pedidoUpdated) return [null, "El pedido no existe"];
        return [pedidoUpdated, null];
    } catch (error) {
        handleError(error, "pedido.service -> updatePedido");
        return [null, error];
    }
}

/**
 * Elimina un pedido por su id de la base de datos
 * @param {string} id Id del pedido
 * @returns {Promise} Promesa con el objeto de pedido eliminado
 */
async function deletePedido(id) {
    try {
        const pedidoDeleted = await Pedido.findByIdAndDelete(id).exec();
        if (!pedidoDeleted) return [null, "El pedido no existe"];
        return [pedidoDeleted, null];
    } catch (error) {
        handleError(error, "pedido.service -> deletePedido");
        return [null, error];
    }
}

export default {
    getPedidos,
    createPedido,
    getPedidoById,
    updatePedido,
    deletePedido,
};
