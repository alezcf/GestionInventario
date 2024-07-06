/* eslint-disable arrow-parens */
"use strict";
// Importa el módulo 'mongoose' para crear la conexión a la base de datos
import { Schema, model } from "mongoose";

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
                type: Schema.Types.ObjectId,
                ref: "Producto",
                required: true,
            },
            
        ],
        stockActual: {
            type: Number,
            required: true,
            default: 0,
            validate: {
                /**
                 * @param {number} value - The value to be validated.
                 * @returns {boolean} - True if the value is valid, false otherwise.
                 */
                validator: function(value) {
                    return value >= 0 && value <= this.maximoStock;
                },
                message: "stockActual debe ser mayor o igual a 0 y menor o igual a maximoStock",
            },
        },
        maximoStock: {
            type: Number,
            required: true,
            validate: {
                /**
                 * @param {number} value - The value to be validated.
                 * @returns {boolean} - True if the value is valid, false otherwise.
                 */
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

inventarioSchema.path("productos").validate(function(value) {
    const uniqueValues = new Set(value.map(v => v.toString()));
    return uniqueValues.size === value.length;
}, "Los productos deben ser únicos.");

const Inventario = model("Inventario", inventarioSchema);

export default Inventario;
