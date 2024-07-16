import EmailService from "../services/email.service.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Envía un correo electrónico predeterminado
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function sendEmail(req, res) {
    try {
        const { to, subject, text, html } = req.body;
        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
            html,
        };

        const [info, error] = await EmailService.sendEmail(mailOptions);
        if (error) return respondError(req, res, 500, error);

        respondSuccess(req, res, 200, info);
    } catch (error) {
        handleError(error, "email.controller -> sendEmail");
        respondError(req, res, 500, error.message);
    }
}

export default {
    sendEmail,
};
