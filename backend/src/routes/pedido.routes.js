"use strict";
// Importa el módulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de pedidos */
import pedidoController from "../controllers/pedido.controller.js";
/** Middlewares de autorización */
import { isAdmin } from "../middlewares/authorization.middleware.js";
/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
/** Instancia del enrutador */
const router = Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los pedidos
router.get("/", isAdmin, pedidoController.getPedidos);
router.post("/", isAdmin, pedidoController.createPedido);
router.get("/:id", isAdmin, pedidoController.getPedidoById);
router.put("/:id", isAdmin, pedidoController.updatePedido);
router.delete("/:id", isAdmin, pedidoController.deletePedido);

// Exporta el enrutador
export default router;
