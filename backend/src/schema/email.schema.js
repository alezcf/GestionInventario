"use strict";

import Joi from "joi";

/**
 * Esquema de validación para el cuerpo de la solicitud de envío de correo electrónico.
 * @constant {Object}
 */
    const emailSchema = Joi.object({
    to: Joi.string().email().required().messages({
        "string.empty": "El campo email no puede estar vacío.",
        "string.email": "El campo email debe ser un correo electrónico válido.",
        "any.required": "El campo email es obligatorio.",
    }),
    subject: Joi.string().required().messages({
        "string.empty": "El campo 'subject' no puede estar vacío.",
        "any.required": "El campo 'subject' es obligatorio.",
    }),
    text: Joi.string().optional().allow(null, "").messages({
        "string.base": "El campo 'text' debe ser un string.",
    }),
    html: Joi.string().optional().allow(null, "").messages({
        "string.base": "El campo 'html' debe ser un string.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

export { emailSchema };
