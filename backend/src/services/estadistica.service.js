"use strict";
import Pedido from "../models/pedido.model.js";
import Inventario from "../models/inventario.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene la cantidad de pedidos por mes
 * @returns {Promise} Promesa con el objeto de pedidos por mes
 */
async function obtenerPedidosPorMes() {
    try {
        const pedidosPorMes = await Pedido.aggregate([
            {
                $unwind: "$productos",
            },
            {
                $group: {
                    _id: { $month: "$fechaPedido" },
                    totalPedidos: { $addToSet: "$_id" },
                    totalProductos: { $sum: 1 },
                    totalCantidad: { $sum: "$productos.cantidad" },
                    costo: {
                        $sum: {
                            $multiply: ["$productos.cantidad", "$productos.precioUnitario"],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    totalPedidos: { $size: "$totalPedidos" },
                    totalProductos: 1,
                    totalCantidad: 1,
                    costo: 1,
                },
            },
            {
                $sort: { "_id": 1 },
            },
        ]);
        if (!pedidosPorMes) return [null, "No hay pedidos"];
        return [pedidosPorMes, null];
    } catch (error) {
        handleError(error, "estadisticas.service -> obtenerPedidosPorMes");
        return [null, error];
    }
}


/**
 * Stock total de cada producto en todos los inventarios.
 * @returns {Promise} Promesa con el objeto de la evolución del stock
 */
async function obtenerEvolucionStock() {
    try {
        const evolucionStock = await Inventario.aggregate([
            {
                $unwind: "$productos",
            },
            {
                $group: {
                    _id: "$productos.productoId",
                    stockTotal: { $sum: "$productos.cantidad" },
                },
            },
        ]);
        if (!evolucionStock) return [null, "No hay datos de stock"];
        return [evolucionStock, null];
    } catch (error) {
        handleError(error, "estadisticas.service -> obtenerEvolucionStock");
        return [null, error];
    }
}

/**
 * Obtiene el stock de productos por categoría
 * @returns {Promise} Promesa con el objeto del stock por categoría
 */
async function obtenerStockPorCategoria() {
    try {
        const stockPorCategoria = await Inventario.aggregate([
            {
                $unwind: "$productos",
            },
            {
                $lookup: {
                    from: "productos",
                    localField: "productos.productoId",
                    foreignField: "_id",
                    as: "producto",
                },
            },
            {
                $unwind: "$producto",
            },
            {
                $group: {
                    _id: "$producto.categoria",
                    totalStock: { $sum: "$productos.cantidad" },
                },
            },
            {
                $sort: { totalStock: -1 },
            },
        ]);
        if (!stockPorCategoria) return [null, "No hay stock por categoría"];
        return [stockPorCategoria, null];
    } catch (error) {
        handleError(error, "estadisticas.service -> obtenerStockPorCategoria");
        return [null, error];
    }
}

export default {
    obtenerPedidosPorMes,
    obtenerEvolucionStock,
    obtenerStockPorCategoria,
};
