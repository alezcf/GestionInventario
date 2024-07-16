/* eslint-disable require-jsdoc */
/* eslint-disable arrow-parens */
"use strict";
// Importa el módulo 'mongoose' para crear la conexión a la base de datos
import { Schema, model } from "mongoose";
import {
    calculateStockBeforeSave,
    calculateStockBeforeUpdate,
} from "../middlewares/inventario.middleware.js";

// Crea el esquema de la colección 'inventarios'
const inventarioSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        productos: [
            {
                productoId: {
                    type: Schema.Types.ObjectId,
                    ref: "Producto",
                    required: false,
                },
                cantidad: {
                    type: Number,
                    required: false,
                },
            },
        ],
        stockActual: {
            type: Number,
            required: false,
            default: 0,
        },
        maximoStock: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= this.stockActual;
                },
                message: "maximoStock debe ser mayor o igual a stockActual",
            },
        },
        fechaIngreso: {
            type: Date,
            default: Date.now,
        },
        fechaActualizacion: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
        collection: "inventarios",
    },
);

// Asocia los middlewares con los hooks correspondientes
inventarioSchema.pre("save", calculateStockBeforeSave);
inventarioSchema.pre("findOneAndUpdate", calculateStockBeforeUpdate);

inventarioSchema.path("productos").validate(function(value) {
    const uniqueValues = new Set(value.map(v => v.productoId.toString()));
    return uniqueValues.size === value.length;
}, "Los productos deben ser únicos.");

const Inventario = model("Inventario", inventarioSchema);

export default Inventario;
