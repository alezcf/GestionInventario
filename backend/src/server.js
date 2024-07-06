/* eslint-disable no-console */
// Importa el archivo 'configEnv.js' para cargar las variables de entorno
import { PORT, HOST } from "./config/configEnv.js";
// Importa el módulo 'cors' para agregar los cors
import cors from "cors";
// Importa el módulo 'express' para crear la aplicacion web
import express, { urlencoded, json } from "express";
// Importamos morgan para ver las peticiones que se hacen al servidor
import morgan from "morgan";
// Importa el módulo 'cookie-parser' para manejar las cookies
import cookieParser from "cookie-parser";
/** El enrutador principal */
import indexRoutes from "./routes/index.routes.js";
// Importa el archivo 'configDB.js' para crear la conexión a la base de datos
import { setupDB } from "./config/configDB.js";
// Importa el handler de errores
import { handleFatalError, handleError } from "./utils/errorHandler.js";

/**
 * Inicia el servidor web
 */
async function setupServer() {
  try {
    const server = express();

    server.disable("x-powered-by");
    server.use(cors({ credentials: true, origin: true }));
    server.use(urlencoded({ extended: true }));
    server.use(json());
    server.use(cookieParser());
    server.use(morgan("dev"));
    server.use("/api", indexRoutes);
    server.use("/uploads", express.static("src/uploads"));

    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}

/**
 * Inicia la API
 */
async function setupAPI() {
  try {
    // Inicia la conexión a la base de datos
    await setupDB();
    // Inicia el servidor web
    await setupServer();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

// Inicia la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));
