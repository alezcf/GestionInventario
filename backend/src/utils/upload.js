/* eslint-disable require-jsdoc */
// /src/utils/upload.js
import multer from "multer";
import path from "path";

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "src/uploads/"); // Directorio donde se almacenarán las imágenes
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
    },
});

// Filtro de archivos para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Solo se permiten imágenes!");
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limite de tamaño de archivo 5MB
    fileFilter: fileFilter,
});

export default upload;
