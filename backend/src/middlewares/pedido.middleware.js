/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
"use strict";
import { model } from "mongoose";

/**
 * Middleware para actualizar el inventario después de guardar un documento de pedido.
 * @param {Object} doc - El documento de pedido guardado.
 * @param {Function} next - La siguiente función de middleware.
 */
const updateInventarioAfterSave = async function(doc, next) {
    try {
        const Inventario = model("Inventario");
        const inventario = await Inventario.findById(doc.inventarioAsignado);

        if (inventario) {
            doc.productos.forEach((producto) => {
                const existingProduct = inventario.productos.find((p) => p.productoId.toString() === producto.productoId.toString());
                if (existingProduct) {
                    existingProduct.cantidad += producto.cantidad;
                } else {
                    inventario.productos.push({ productoId: producto.productoId, cantidad: producto.cantidad });
                }
            });

            inventario.productos = inventario.productos.filter((producto) => producto.cantidad > 0);
            inventario.stockActual = inventario.productos.reduce((total, producto) => total + producto.cantidad, 0);
            inventario.fechaActualizacion = Date.now();
            await inventario.save();
        }
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Middleware para actualizar el inventario antes de actualizar un documento de pedido.
 * @param {Function} next - La siguiente función de middleware.
 */
const updateInventarioBeforeUpdate = async function(next) {
    try {
        const pedido = await this.model.findOne(this.getQuery());
        if (pedido) {
            const Inventario = model("Inventario");
            const inventario = await Inventario.findById(pedido.inventarioAsignado);

            if (inventario) {
                pedido.productos.forEach((producto) => {
                    const existingProduct = inventario.productos.find((p) => p.productoId.toString() === producto.productoId.toString());
                    if (existingProduct) {
                        existingProduct.cantidad -= producto.cantidad;
                    }
                });

                const update = this.getUpdate();
                const updatedProducts = update.$set ? update.$set.productos : update.productos;

                if (updatedProducts) {
                    updatedProducts.forEach((producto) => {
                        const existingProduct = inventario.productos.find((p) => p.productoId.toString() === producto.productoId.toString());
                        if (existingProduct) {
                            existingProduct.cantidad += producto.cantidad;
                        } else {
                            inventario.productos.push({ productoId: producto.productoId, cantidad: producto.cantidad });
                        }
                    });

                    inventario.productos = inventario.productos.filter((producto) => producto.cantidad > 0);
                    inventario.stockActual = inventario.productos.reduce((total, producto) => total + producto.cantidad, 0);
                    inventario.fechaActualizacion = Date.now();
                    await inventario.save();
                }
            }
        }
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Middleware para actualizar el inventario antes de eliminar un documento de pedido.
 * @param {Function} next - La siguiente función de middleware.
 */
const updateInventarioBeforeDelete = async function(next) {
    try {
        const pedido = await this.model.findOne(this.getQuery());
        if (pedido) {
            const Inventario = model("Inventario");
            const inventario = await Inventario.findById(pedido.inventarioAsignado);

            if (inventario) {
                pedido.productos.forEach((producto) => {
                    const existingProduct = inventario.productos.find((p) => p.productoId.toString() === producto.productoId.toString());
                    if (existingProduct) {
                        existingProduct.cantidad -= producto.cantidad;
                    }
                });

                inventario.productos = inventario.productos.filter((producto) => producto.cantidad > 0);
                inventario.stockActual = inventario.productos.reduce((total, producto) => total + producto.cantidad, 0);
                inventario.fechaActualizacion = Date.now();
                await inventario.save();
            }
        }
        next();
    } catch (error) {
        next(error);
    }
};

export { updateInventarioAfterSave, updateInventarioBeforeUpdate, updateInventarioBeforeDelete };
