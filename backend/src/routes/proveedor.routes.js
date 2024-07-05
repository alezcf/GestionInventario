"use strict";
// Importa el módulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de proveedores */
import proveedorController from "../controllers/proveedor.controller.js";
/** Middlewares de autorización */
import { isAdmin } from "../middlewares/authorization.middleware.js";
/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
/** Instancia del enrutador */
const router = Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los proveedores
router.get("/", isAdmin, proveedorController.getProveedores);
router.post("/", isAdmin, proveedorController.createProveedor);
router.get("/:id", isAdmin, proveedorController.getProveedorById);
router.put("/:id", isAdmin, proveedorController.updateProveedor);
router.delete("/:id", isAdmin, proveedorController.deleteProveedor);

// Exporta el enrutador
export default router;
