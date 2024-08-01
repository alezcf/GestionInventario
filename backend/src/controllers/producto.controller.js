"use strict";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import ProductoService from "../services/producto.service.js";
import { handleError } from "../utils/errorHandler.js";
import { promises as fs } from "fs";
import { productoBodySchema, productoIdSchema } from "../schema/producto.schema.js";

/**
 * Obtiene todos los productos
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getProductos(req, res) {
    try {
        const [productos, errorProductos] = await ProductoService.getProductos();
        if (errorProductos) return respondError(req, res, 404, errorProductos);

        if (productos.length === 0) {
            respondSuccess(req, res, 204);
        } else {
            respondSuccess(req, res, 200, productos);
        }
    } catch (error) {
        handleError(error, "producto.controller -> getProductos");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea un nuevo producto
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createProducto(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = productoBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const productoData = { ...body };

        // Intenta crear el producto sin la imagen
        const [newProducto, errorProducto] = await ProductoService.createProducto(productoData);
        if (errorProducto) {
            // Si hay un error, eliminar la imagen subida por multer si existe
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            return respondError(req, res, 400, errorProducto);
        }

        // Si la respuesta es 201 y el producto fue creado exitosamente, verifica si hay una imagen para guardar
        if (req.file) {
            // Guarda la ruta de la imagen en el producto
            newProducto.imagen = req.file.path;
            await newProducto.save();
        }

        respondSuccess(req, res, 201, newProducto);
    } catch (error) {
        // En caso de error general, también eliminar la imagen si existe
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        handleError(error, "producto.controller -> createProducto");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Obtiene un producto por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getProductoById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = productoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [producto, errorProducto] = await ProductoService.getProductoById(params.id);
        if (errorProducto) return respondError(req, res, 404, errorProducto);

        respondSuccess(req, res, 200, producto);
    } catch (error) {
        handleError(error, "producto.controller -> getProductoById");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Actualiza un producto por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateProducto(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = productoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = productoBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        // Intenta actualizar el producto sin la imagen
        const [productoUpdated, errorProducto] = await ProductoService.updateProducto(
            params.id,
            body,
        );
        if (errorProducto) {
            // Si hay un error, eliminar la imagen subida por multer si existe
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            return respondError(req, res, 400, errorProducto);
        }
    
        // Si hay una nueva imagen, manejar la actualización de la imagen
        if (req.file) {
            // Elimina la imagen anterior si existe
            if (productoUpdated.imagen && fs.existsSync(productoUpdated.imagen)) {
                fs.unlinkSync(productoUpdated.imagen);
            }

            // Guarda la nueva ruta de la imagen en el producto
            productoUpdated.imagen = req.file.path;
            await productoUpdated.save();
        }

        // Mantiene la imagen inicial si no se sube una nueva
        respondSuccess(req, res, 200, productoUpdated);
    } catch (error) {
        // En caso de error general, también eliminar la imagen si existe
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        handleError(error, "producto.controller -> updateProducto");
        respondError(req, res, 500, error.message);
    }
}

/**
 * Elimina un producto por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteProducto(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = productoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [producto, errorProducto] = await ProductoService.getProductoById(params.id);
        if (errorProducto) return respondError(req, res, 404, errorProducto);

        const [productoDeleted, errorDelete] = await ProductoService.deleteProducto(params.id);
        if (errorDelete) return respondError(req, res, 404, errorDelete);

        if (producto.imagen) {
            await fs.unlink(producto.imagen);
        }

        respondSuccess(req, res, 200, productoDeleted);
    } catch (error) {
        handleError(error, "producto.controller -> deleteProducto");
        respondError(req, res, 500, error.message);
    }
}

export default {
    getProductos,
    createProducto,
    getProductoById,
    updateProducto,
    deleteProducto,
};
