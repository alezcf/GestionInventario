// /src/middlewares/pedido.middleware.js
"use strict";
import { model } from "mongoose";

const updateInventarioAfterSave = async function(doc, next) {
    try {
        const Inventario = model("Inventario");
        const inventario = await Inventario.findById(doc.inventarioAsignado);

        if (inventario) {
            doc.productos.forEach((producto) => {
                if (producto.cantidad > 0) {
                    const existingProduct = inventario.productos.find((p) => 
                        p.toString() === producto.productoId.toString(),
                    );
                    if (existingProduct) {
                        inventario.stockActual += producto.cantidad;
                    } else {
                        inventario.productos.push(producto.productoId);
                        inventario.stockActual += producto.cantidad;
                    }
                }
            });
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
                    if (producto.cantidad > 0) {
                        const existingProduct = inventario.productos.find((p) => 
                            p.toString() === producto.productoId.toString(),
                        );
                        if (existingProduct) {
                            inventario.stockActual -= producto.cantidad;
                            if (inventario.stockActual === 0) {
                                inventario.productos = inventario.productos.filter((p) => p.toString() !== producto.productoId.toString());
                            }
                        }
                    }
                });

                const update = this.getUpdate();
                const updatedProducts = update.$set ? update.$set.productos : update.productos;

                if (updatedProducts) {
                    updatedProducts.forEach((producto) => {
                        if (producto.cantidad > 0) {
                            const existingProduct = inventario.productos.find((p) => 
                                p.toString() === producto.productoId.toString(),
                            );
                            if (existingProduct) {
                                inventario.stockActual += producto.cantidad;
                            } else {
                                inventario.productos.push(producto.productoId);
                                inventario.stockActual += producto.cantidad;
                            }
                        }
                    });
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
                    if (producto.cantidad > 0) {
                        const existingProduct = inventario.productos.find((p) => 
                            p.toString() === producto.productoId.toString(),
                        );
                        if (existingProduct) {
                            inventario.stockActual -= producto.cantidad;
                            if (inventario.stockActual === 0) {
                                inventario.productos = inventario.productos.filter((p) => p.toString() !== producto.productoId.toString());
                            }
                        }
                    }
                });
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
