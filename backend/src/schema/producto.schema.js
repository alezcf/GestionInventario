"use strict";

import Joi from "joi";
import CATEGORIAS from "../constants/categorias.constants.js";
import TIPOS from "../constants/tipos.constants.js";
import MEDIDAS from "../constants/medidas.constants.js";

/**
 * Esquema de validación para el cuerpo de la solicitud de producto.
 * @constant {Object}
 */
const productoBodySchema = Joi.object({
    nombre: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
    }),
    descripcion: Joi.string().optional().default("Sin descripcion").messages({
        "string.empty": "La descripción no puede estar vacía.",
    }),
    marca: Joi.string().optional().default("Sin marca").messages({
        "string.empty": "La marca no puede estar vacía.",
    }),
    cantidad: Joi.number().optional().default(0).messages({
        "number.base": "La cantidad debe ser un número.",
    }),
    unidadMedida: Joi.string().valid(...MEDIDAS).optional().default("U").messages({
        "string.base": "La unidad de medida debe ser un string.",
        "any.only": "La unidad de medida proporcionada no es válida.",
    }),
    precio: Joi.number().optional().default(0).messages({
        "number.base": "El precio debe ser un número.",
    }),
    categoria: Joi.string().valid(...CATEGORIAS).optional().default("Otro").messages({
        "string.base": "La categoría debe ser un string.",
        "any.only": "La categoría proporcionada no es válida.",
    }),
    codigoBarras: Joi.string().optional().default(null).messages({
        "string.base": "El código de barras debe ser un string.",
    }),
    imagen: Joi.string().optional().default(null).messages({
        "string.base": "La imagen debe ser un string.",
    }),
    proveedor: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().default(null).messages({
        "string.empty": "El ID del proveedor no puede estar vacío.",
        "string.pattern.base": "El ID del proveedor no es válido.",
    }),
    tipo: Joi.string().valid(...TIPOS).optional().default("Otro").messages({
        "string.base": "El tipo debe ser un string.",
        "any.only": "El tipo proporcionado no es válido.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de producto.
 * @constant {Object}
 */
const productoIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
        "string.empty": "El ID no puede estar vacío.",
        "any.required": "El ID es obligatorio.",
        "string.base": "El ID debe ser de tipo string.",
        "string.pattern.base": "El ID proporcionado no es válido.",
        }),
});

export { productoBodySchema, productoIdSchema };
