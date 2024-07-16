import Email from "../models/email.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Envía un correo electrónico
 * @param {Object} mailOptions - Opciones del correo
 * @returns {Promise} Promesa con el resultado del envío del correo
 */
async function sendEmail(mailOptions) {
    try {
        const [info, error] = await Email.sendEmail(mailOptions);
        if (error) {
            throw error;
        }
        return [info, null];
    } catch (error) {
        handleError(error, "email.service -> sendEmail");
        return [null, error];
    }
}

export default {
    sendEmail,
};
