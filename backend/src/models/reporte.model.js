"use strict";
// Importa el módulo 'mongoose' para crear la conexión a la base de datos
import { Schema, model } from "mongoose";

// Crea el esquema de la colección 'reportes'
const reporteSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        titulo: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: false,
            default: "Sin descripción",
        },
        importancia: {
            type: String,
            required: true,
            enum: ["Baja", "Media", "Alta"],
        },
        fecha: {
            type: Date,
            required: true,
            default: Date.now,
        },
        productoAsignado: {
            type: Schema.Types.ObjectId,
            ref: "Producto",
            required: false,
            default: null,
        },
    },
    {
        versionKey: false,
        collection: "reportes",
    },
);

// Crea el modelo de datos 'Reporte' a partir del esquema 'reporteSchema'
const Reporte = model("Reporte", reporteSchema);

export default Reporte;
