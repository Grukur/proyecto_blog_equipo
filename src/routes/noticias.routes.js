import { Router } from "express";
import { addNoticias, findAllNoticias } from "../controllers/noticias.controllers.js";
import { uploadFiles } from "../middlewares/upload.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

// Ruta Noticias
router.get('/', findAllNoticias);
router.post('/', verifyToken, uploadFiles, addNoticias);

export default router