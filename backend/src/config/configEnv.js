"use strict";
// Import the 'path' and 'url' modules to get the absolute path of the .env file
import path from "node:path";
import { fileURLToPath } from "node:url";

// Obtener el nombre del archivo actual y la ruta del directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Get the absolute path of the .env file. */
const envFilePath = path.resolve(__dirname, ".env");

// Load environment variables from the .env file
import dotenv from "dotenv";
dotenv.config({ path: envFilePath });

/** Server port */
export const PORT = process.env.PORT;
/** Server host */
export const HOST = process.env.HOST;
/** Database URL */
export const DB_URL = process.env.DB_URL;
/** Access token secret */
export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
/** Refresh token secret */
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
