/* eslint-disable no-invalid-this */
/* eslint-disable require-jsdoc */
"use strict";
import { model } from "mongoose";

const updateInventarioAfterSave = async function(doc, next) {
    try {
        const Inventario = model("Inventario");
        const inventario = await Inventario.findById(doc.inventarioAsignado);

        if (inventario) {
            doc.productos.forEach((producto) => {
                const existingProduct = inventario.productos.find((p) => {
                    return p.productoId.toString() === producto.productoId.toString();
                });
                if (existingProduct) {
                    existingProduct.cantidad += producto.cantidad;
                } else {
                    inventario.productos.push({
                        productoId: producto.productoId,
                        cantidad: producto.cantidad,
                    });
                }
            });

            /**
             * Calculate the total stock from the products array.
             * @param {number} total - The accumulated total.
             * @param {object} producto - The current product object.
             * @returns {number} - The updated total.
             */
            const calculateStock = (total, producto) => total + producto.cantidad;
            
            inventario.stockActual = inventario.productos.reduce(calculateStock, 0);
            inventario.fechaActualizacion = Date.now();
            await inventario.save();
        }
        next();
    } catch (error) {
        next(error);
    }
};

const updateInventarioBeforeUpdate = async function(next) {
    try {
        const pedido = await this.model.findOne(this.getQuery());
        if (pedido) {
            const Inventario = model("Inventario");
            const inventario = await Inventario.findById(pedido.inventarioAsignado);

            if (inventario) {
                pedido.productos.forEach((producto) => {
                    const existingProduct = inventario.productos.find((p) => {
                        return p.productoId.toString() === producto.productoId.toString();
                    });
                    if (existingProduct) {
                        existingProduct.cantidad -= producto.cantidad;
                    }
                });

                const update = this.getUpdate();
                const updatedProducts = update.$set ? update.$set.productos : update.productos;

                if (updatedProducts) {
                    updatedProducts.forEach((producto) => {
                        const existingProduct = inventario.productos.find((p) => {
                            return p.productoId.toString() === producto.productoId.toString();
                        });
                        if (existingProduct) {
                            existingProduct.cantidad += producto.cantidad;
                        } else {
                            inventario.productos.push({
                                productoId: producto.productoId,
                                cantidad: producto.cantidad,
                            });
                        }
                    });

                    inventario.stockActual = inventario.productos.reduce((total, producto) => {
                        return total + producto.cantidad;
                    }, 0);
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

const updateInventarioBeforeDelete = async function(next) {
    try {
        const pedido = await this.model.findOne(this.getQuery());
        if (pedido) {
            const Inventario = model("Inventario");
            const inventario = await Inventario.findById(pedido.inventarioAsignado);

            if (inventario) {
                pedido.productos.forEach((producto) => {
                    const existingProduct = inventario.productos.find((p) => {
                        return p.productoId.toString() === producto.productoId.toString();
                    });
                    if (existingProduct) {
                        existingProduct.cantidad -= producto.cantidad;
                        if (existingProduct.cantidad <= 0) {
                            inventario.productos = inventario.productos.filter((p) => {
                                return p.productoId.toString() !== producto.productoId.toString();
                            });
                        }
                    }
                });

                inventario.stockActual = inventario.productos.reduce(
                    (total, producto) => total + producto.cantidad,
                    0,
                );
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
