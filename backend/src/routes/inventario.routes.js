"use strict";
// Importa el módulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de inventarios */
import inventarioController from "../controllers/inventario.controller.js";
/** Middlewares de autorización */
import { isAdmin } from "../middlewares/authorization.middleware.js";
/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
/** Instancia del enrutador */
const router = Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los inventarios
router.get("/", isAdmin, inventarioController.getInventarios);
router.post("/", isAdmin, inventarioController.createInventario);
router.get("/:id", isAdmin, inventarioController.getInventarioById);
router.put("/:id", isAdmin, inventarioController.updateInventario);
router.delete("/:id", isAdmin, inventarioController.deleteInventario);

// Exporta el enrutador
export default router;
