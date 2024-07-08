// /src/models/pedido.model.js
"use strict";
import { Schema, model } from "mongoose";
import {
    updateInventarioAfterSave,
    updateInventarioBeforeUpdate,
    updateInventarioBeforeDelete,
} from "../middlewares/pedido.middleware.js";

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

// Asocia los middlewares con los hooks correspondientes
pedidoSchema.post("save", updateInventarioAfterSave);
pedidoSchema.pre("findOneAndUpdate", updateInventarioBeforeUpdate);
pedidoSchema.pre("findOneAndDelete", updateInventarioBeforeDelete);

const Pedido = model("Pedido", pedidoSchema);

export default Pedido;
