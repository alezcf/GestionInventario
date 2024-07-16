"use strict";

import Joi from "joi";

/**
 * Esquema de validación para el cuerpo de la solicitud de proveedor.
 * @constant {Object}
 */
const proveedorBodySchema = Joi.object({
    nombre: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
    }),
    descripcion: Joi.string().optional().default("No aplica").messages({
        "string.empty": "La descripción no puede estar vacía.",
    }),
    direccion: Joi.string().required().messages({
        "string.empty": "La dirección no puede estar vacía.",
        "any.required": "La dirección es obligatoria.",
    }),
    telefono: Joi.string().required().messages({
        "string.empty": "El teléfono no puede estar vacío.",
        "any.required": "El teléfono es obligatorio.",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "El correo electrónico no puede estar vacío.",
        "string.email": "Por favor ingrese un correo electrónico válido.",
        "any.required": "El correo electrónico es obligatorio.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de proveedor.
 * @constant {Object}
 */
const proveedorIdSchema = Joi.object({
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

export { proveedorBodySchema, proveedorIdSchema };
