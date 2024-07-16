"use strict";

import Joi from "joi";

/**
 * Esquema de validación para el cuerpo de la solicitud de pedido.
 * @constant {Object}
 */
const pedidoBodySchema = Joi.object({
    proveedor: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.empty": "El ID del proveedor no puede estar vacío.",
        "string.pattern.base": "El ID del proveedor no es válido.",
        "any.required": "El ID del proveedor es obligatorio.",
    }),
    inventarioAsignado: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.empty": "El ID del inventario no puede estar vacío.",
        "string.pattern.base": "El ID del inventario no es válido.",
        "any.required": "El ID del inventario es obligatorio.",
    }),
    productos: Joi.array().items(
        Joi.object({
        productoId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
            "string.empty": "El ID del producto no puede estar vacío.",
            "string.pattern.base": "El ID del producto no es válido.",
            "any.required": "El ID del producto es obligatorio.",
        }),
        cantidad: Joi.number().integer().min(0).required().messages({
            "number.base": "La cantidad debe ser un número.",
            "number.integer": "La cantidad debe ser un número entero.",
            "number.min": "La cantidad debe ser al menos 0.",
            "any.required": "La cantidad es obligatoria.",
        }),
        precioUnitario: Joi.number().min(0).required().messages({
            "number.base": "El precio unitario debe ser un número.",
            "number.min": "El precio unitario debe ser al menos 0.",
            "any.required": "El precio unitario es obligatorio.",
        }),
        }),
    ).required().messages({
        "array.base": "Los productos deben estar en un array.",
        "any.required": "Los productos son obligatorios.",
    }),
    fechaPedido: Joi.date().optional().messages({
        "date.base": "La fecha del pedido debe ser una fecha válida.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de pedido.
 * @constant {Object}
 */
const pedidoIdSchema = Joi.object({
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

export { pedidoBodySchema, pedidoIdSchema };
