"use strict";
// Importa el módulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de reportes */
import reporteController from "../controllers/reporte.controller.js";
/** Middlewares de autorización */
import { isAdmin } from "../middlewares/authorization.middleware.js";
/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
/** Instancia del enrutador */
const router = Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los reportes
router.get("/", isAdmin, reporteController.getReportes);
router.post("/", isAdmin, reporteController.createReporte);
router.get("/:id", isAdmin, reporteController.getReporteById);
router.put("/:id", isAdmin, reporteController.updateReporte);
router.delete("/:id", isAdmin, reporteController.deleteReporte);

// Exporta el enrutador
export default router;
