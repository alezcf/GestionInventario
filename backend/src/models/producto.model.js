"use strict";
// Importa el módulo 'mongoose' para crear la conexión a la base de datos
import { Schema, model } from "mongoose";
import CATEGORIAS from "../constants/categorias.constants.js";
import TIPOS from "../constants/tipos.constants.js";

// Crea el esquema de la colección 'productos'
const productoSchema = new Schema(
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
        descripcion: {
            type: String,
            required: false,
            default: "Sin descripcion",
        },
        precio: {
            type: Number,
            required: false,
            default: 0,
        },
        categoria: {
            type: String,
            enum: CATEGORIAS,
            required: false,
            default: "Otro",
        },
        codigoBarras: {
            type: String,
            required: false,
            default: null,
        },
        imagen: {
            type: String,
            required: false,
            default: null,
        },
        proveedor: {
            type: Schema.Types.ObjectId,
            ref: "Proveedor",
            required: false,
            default: null,
        },
        tipo: {
            type: String,
            enum: TIPOS,
            required: false,
            default: "Otro",
        },
    },
    {
        versionKey: false,
        collection: "productos",
    },
);

// Crea el modelo de datos 'Producto' a partir del esquema 'productoSchema'
const Producto = model("Producto", productoSchema);

export default Producto;
