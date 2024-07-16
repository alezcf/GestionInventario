"use strict";

import Joi from "joi";

/**
 * Esquema de validación para el cuerpo de la solicitud de inventario.
 * @constant {Object}
 */
const inventarioBodySchema = Joi.object({
    productos: Joi.array().items(
        Joi.object({
        productoId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
            "string.empty": "El ID del producto no puede estar vacío.",
            "string.pattern.base": "El ID del producto no es válido.",
        }),
        cantidad: Joi.number().integer().min(0).messages({
            "number.base": "La cantidad debe ser un número.",
            "number.integer": "La cantidad debe ser un número entero.",
            "number.min": "La cantidad debe ser al menos 0.",
        }),
        }),
    ).unique((a, b) => a.productoId === b.productoId).messages({
        "array.base": "Los productos deben estar en un array.",
        "array.unique": "Cada producto en el inventario debe ser único.",
    }),
    stockActual: Joi.number().optional().min(0).messages({
        "number.base": "El stock actual debe ser un número.",
        "number.min": "El stock actual debe ser al menos 0.",
    }),
    maximoStock: Joi.number().required().messages({
        "number.base": "El máximo stock debe ser un número.",
        "any.required": "El máximo stock es obligatorio.",
    }),
    fechaIngreso: Joi.date().optional().messages({
        "date.base": "La fecha de ingreso debe ser una fecha válida.",
    }),
    fechaActualizacion: Joi.date().optional().messages({
        "date.base": "La fecha de actualización debe ser una fecha válida.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de inventario.
 * @constant {Object}
 */
const inventarioIdSchema = Joi.object({
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

export { inventarioBodySchema, inventarioIdSchema };
