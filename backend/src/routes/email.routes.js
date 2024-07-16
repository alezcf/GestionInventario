import { Router } from "express";
import emailController from "../controllers/email.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
const router = Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los correos electrónicos
router.post("/send", isAdmin, emailController.sendEmail);

export default router;
