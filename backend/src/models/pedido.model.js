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

// Crea el modelo de datos 'Pedido' a partir del esquema 'pedidoSchema'
const Pedido = model("Pedido", pedidoSchema);

export default Pedido;
