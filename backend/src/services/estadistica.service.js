"use strict";
import Pedido from "../models/pedido.model.js";
import Inventario from "../models/inventario.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene el resumen de pedidos por proveedor
 * @returns {Promise} Promesa con el objeto del resumen de pedidos
 */
async function obtenerResumenPedidos() {
    try {
        const resumen = await Pedido.aggregate([
            {
                $group: {
                    _id: "$proveedor",
                    totalPedidos: { $sum: 1 },
                    totalProductos: { $sum: { $size: "$productos" } },
                },
            },
            {
                $lookup: {
                    from: "proveedors",
                    localField: "_id",
                    foreignField: "_id",
                    as: "proveedor",
                },
            },
            {
                $unwind: "$proveedor",
            },
        ]);
        if (!resumen) return [null, "No hay pedidos"];
        return [resumen, null];
    } catch (error) {
        handleError(error, "estadisticas.service -> obtenerResumenPedidos");
        return [null, error];
    }
}

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
                    totalPedidos: { $sum: 1 },
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
 * Obtiene la evolución del stock de productos
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
                    stockTotal: { $sum: "$stockActual" },
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

export default {
    obtenerResumenPedidos,
    obtenerPedidosPorMes,
    obtenerEvolucionStock,
};
