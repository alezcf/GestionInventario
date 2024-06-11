"use strict";
// Importa el módulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de productos */
import productoController from "../controllers/producto.controller.js";
/** Middlewares de autorización */
import { isAdmin } from "../middlewares/authorization.middleware.js";
/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
/** Instancia del enrutador */
const router = Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los productos
router.get("/", isAdmin, productoController.getProductos);
router.post("/", isAdmin, productoController.createProducto);
router.get("/:id", isAdmin, productoController.getProductoById);
router.put("/:id", isAdmin, productoController.updateProducto);
router.delete("/:id", isAdmin, productoController.deleteProducto);

// Exporta el enrutador
export default router;
