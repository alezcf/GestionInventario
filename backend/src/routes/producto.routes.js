"use strict";
import { Router } from "express";
import productoController from "../controllers/producto.controller.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import upload from "../utils/upload.js"; // Importar configuración de multer

const router = Router();

router.use(authenticationMiddleware);

// Rutas para los productos
router.get("/", isAdmin, productoController.getProductos);
router.post("/", isAdmin, upload.single("imagen"),
    productoController.createProducto);
router.get("/:id", isAdmin, productoController.getProductoById);
router.put("/:id", isAdmin, upload.single("imagen"),
    productoController.updateProducto);
router.delete("/:id", isAdmin, productoController.deleteProducto);

export default router;
