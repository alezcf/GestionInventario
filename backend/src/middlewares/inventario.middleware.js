/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
/* eslint-disable arrow-parens */
"use strict";

/**
 * Middleware para calcular el stockActual antes de guardar un documento.
 * @param {Function} next - La función de middleware que se llama después de este middleware.
 */
const calculateStockBeforeSave = function(next) {
    this.stockActual = this.productos.reduce((total, producto) => total + (producto.cantidad || 0), 0);
    next();
};

/**
 * Middleware para calcular el stockActual antes de actualizar un documento.
 * @param {Function} next - La función de middleware que se llama después de este middleware.
 */
const calculateStockBeforeUpdate = function(next) {
    const update = this.getUpdate();
    if (update.productos) {
        update.stockActual = update.productos.reduce((total, producto) => total + (producto.cantidad || 0), 0);
    }
    next();
};

export { calculateStockBeforeSave, calculateStockBeforeUpdate };
