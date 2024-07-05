"use strict";
// Importa el módulo 'mongoose' para crear la conexión a la base de datos
import { Schema, model } from "mongoose";

// Crea el esquema de la colección 'proveedores'
const proveedorSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true,
            auto: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        rut: {
            type: String,
            required: true,
        },
        direccion: {
            type: String,
            required: true,
        },
        telefono: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: [/.+@.+\..+/, "Por favor ingrese un correo electrónico válido"],
        },
    },
    {
        versionKey: false,
        collection: "proveedores",
    },
);

// Crea el modelo de datos 'Proveedor' a partir del esquema 'proveedorSchema'
const Proveedor = model("Proveedor", proveedorSchema);

export default Proveedor;
