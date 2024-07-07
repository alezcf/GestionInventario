"use strict";
// Importa el módulo 'mongoose' para crear la conexión a la base de datos
import { Schema, model } from "mongoose";

// Crea el esquema de la colección 'pedidos'
const pedidoSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        proveedor: {
            type: Schema.Types.ObjectId,
            ref: "Proveedor",
            required: true,
        },
        inventarioAsignado: {
            type: Schema.Types.ObjectId,
            ref: "Inventario",
            required: true,
        },
        productos: [
            {
                productoId: {
                    type: Schema.Types.ObjectId,
                    ref: "Producto",
                    required: true,
                },
                cantidad: {
                    type: Number,
                    required: true,
                },
                precioUnitario: {
                    type: Number,
                    required: true,
                },
                _id: false,
            },
        ],
        fechaPedido: {
            type: Date,
            default: Date.now,
        },
        estado: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        collection: "pedidos",
    },
);

// Middleware para actualizar el inventario después de guardar un pedido
pedidoSchema.post("save", async function(doc, next) {
    try {
        // Importa el modelo Inventario
        const Inventario = model("Inventario");
        
        // Encuentra el inventario asignado
        const inventario = await Inventario.findById(doc.inventarioAsignado);

        // Actualiza el inventario con los productos del pedido
        if (inventario) {
            doc.productos.forEach((producto) => {
                const existingProduct = inventario.productos.find((p) => 
                    p.toString() === producto.productoId.toString(),
                );
                if (existingProduct) {
                    inventario.stockActual += producto.cantidad;
                } else {
                    inventario.productos.push(producto.productoId);
                    inventario.stockActual += producto.cantidad;
                }
            });
            // Actualiza la fecha de actualización del inventario
            inventario.fechaActualizacion = Date.now();
            await inventario.save();
        }
        
        next();
    } catch (error) {
        next(error);
    }
});

// Middleware para actualizar el inventario antes de actualizar un pedido
pedidoSchema.pre("findOneAndUpdate", async function(next) {
    try {
        const pedido = await this.model.findOne(this.getQuery());

        if (pedido) {
            // Importa el modelo Inventario
            const Inventario = model("Inventario");

            // Encuentra el inventario asignado
            const inventario = await Inventario.findById(pedido.inventarioAsignado);

            if (inventario) {
                // Revertir el stock del pedido original
                pedido.productos.forEach((producto) => {
                    const existingProduct = inventario.productos.find((p) => 
                        p.toString() === producto.productoId.toString(),
                    );
                    if (existingProduct) {
                        inventario.stockActual -= producto.cantidad;
                    }
                });

                // Obtener los productos del pedido actualizado
                const update = this.getUpdate();
                const updatedProducts = update.$set ? update.$set.productos : update.productos;

                if (updatedProducts) {
                    // Aplicar el nuevo stock del pedido actualizado
                    updatedProducts.forEach((producto) => {
                        const existingProduct = inventario.productos.find((p) => 
                            p.toString() === producto.productoId.toString(),
                        );
                        if (existingProduct) {
                            inventario.stockActual += producto.cantidad;
                        } else {
                            inventario.productos.push(producto.productoId);
                            inventario.stockActual += producto.cantidad;
                        }
                    });

                    // Actualiza la fecha de actualización del inventario
                    inventario.fechaActualizacion = Date.now();
                    await inventario.save();
                }
            }
        }

        next();
    } catch (error) {
        next(error);
    }
});

// Middleware para actualizar el inventario antes de eliminar un pedido
pedidoSchema.pre("findOneAndDelete", async function(next) {
    try {
        const pedido = await this.model.findOne(this.getQuery());
        
        if (pedido) {
            // Importa el modelo Inventario
            const Inventario = model("Inventario");
            
            // Encuentra el inventario asignado
            const inventario = await Inventario.findById(pedido.inventarioAsignado);

            if (inventario) {
                // Revertir el stock del pedido a eliminar
                pedido.productos.forEach((producto) => {
                    const existingProduct = inventario.productos.find((p) => 
                        p.toString() === producto.productoId.toString(),
                    );
                    if (existingProduct) {
                        inventario.stockActual -= producto.cantidad;
                    }
                });

                // Actualiza la fecha de actualización del inventario
                inventario.fechaActualizacion = Date.now();
                await inventario.save();
            }
        }

        next();
    } catch (error) {
        next(error);
    }
});

// Crea el modelo de datos 'Pedido' a partir del esquema 'pedidoSchema'
const Pedido = model("Pedido", pedidoSchema);

export default Pedido;
