"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Enrutador de manejo para usuario autorizados */
import productoRoutes from "./producto.routes.js";

/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
router.use("/productos", authenticationMiddleware, productoRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);


// Exporta el enrutador
export default router;
