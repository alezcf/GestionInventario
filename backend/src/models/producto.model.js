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
        },
        precio: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        categoria: {
            type: String,
            enum: CATEGORIAS,
            required: true,
        },
        codigoBarras: {
            type: String,
        },
        imagen: {
            type: String,
        },
        proveedor: {
            type: Schema.Types.ObjectId,
            ref: "proveedores",
            required: true,
        },
        tipo: {
            type: String,
            enum: TIPOS,
            required: true,
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
