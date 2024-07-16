"use strict";

import Joi from "joi";

/**
 * Esquema de validación para el cuerpo de la solicitud de reporte.
 * @constant {Object}
 */
const reporteBodySchema = Joi.object({
    titulo: Joi.string().required().messages({
        "string.empty": "El título no puede estar vacío.",
        "any.required": "El título es obligatorio.",
    }),
    descripcion: Joi.string().required().default("Sin descripción").messages({
        "string.empty": "La descripción no puede estar vacía.",
        "any.required": "La descripción es obligatoria.",
    }),
    importancia: Joi.string().valid("Baja", "Media", "Alta").required().messages({
        "string.empty": "La importancia no puede estar vacía.",
        "any.required": "La importancia es obligatoria.",
        "any.only": "La importancia debe ser 'Baja', 'Media' o 'Alta'.",
    }),
    fecha: Joi.date().optional().default(() => new Date()).messages({
        "date.base": "La fecha debe ser una fecha válida.",
    }),
    productoAsignado: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().allow(null).messages({
        "string.pattern.base": "El ID del producto asignado no es válido.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de reporte.
 * @constant {Object}
 */
const reporteIdSchema = Joi.object({
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

export { reporteBodySchema, reporteIdSchema };
