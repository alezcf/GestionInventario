"use strict";
// Importa el módulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de estadísticas */
import estadisticasController from "../controllers/estadistica.controller.js";
/** Middlewares de autorización */
import { isAdmin } from "../middlewares/authorization.middleware.js";
/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
/** Instancia del enrutador */
const router = Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para las estadísticas
router.get("/resumen-pedidos", isAdmin, estadisticasController.getResumenPedidos);
router.get("/pedidos-por-mes", isAdmin, estadisticasController.getPedidosPorMes);
router.get("/evolucion-stock", isAdmin, estadisticasController.getEvolucionStock);

// Exporta el enrutador
export default router;
