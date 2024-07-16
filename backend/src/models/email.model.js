/* eslint-disable require-jsdoc */
import nodemailer from "nodemailer";

class EmailManager {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendEmail({ from, to, subject, text, html }) {
        try {
            const info = await this.transporter.sendMail({ from, to, subject, text, html });
            return [info, null];
        } catch (error) {
            console.error("Error in EmailManager -> sendEmail:", error);
            return [null, error];
        }
    }
}

export default new EmailManager();
