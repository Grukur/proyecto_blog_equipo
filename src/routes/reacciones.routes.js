import { Router } from "express";
import { addProductosCloud, editProductCloud, deleteProductsCloud } from "../controllers/productosCloud.controllers.js";
import { findAllReacciones, addReacciones } from "../controllers/reacciones.controllers.js";
import {uploadFiles, editFiles} from "../middlewares/upload.middleware.js"
import { uploadFilesCloud } from "../middlewares/uploadCloud.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

//ruta findAll productos

//ruta productos
router.get("/", findAllReacciones);
router.post("/", verifyToken, addReacciones);
//router.put("/:id", verifyToken, editFiles, editReacciones);
//router.delete("/:id", verifyToken, changeStatus);
//router.delete("/destroy/:id", verifyToken, editFiles, deleteReacciones);

//ruta productos cloud
router.post("/cloud", verifyToken, uploadFilesCloud, addProductosCloud);
router.put("/cloud/:id", verifyToken, uploadFilesCloud, editProductCloud);
router.delete("/cloud/destroy/:id", verifyToken, deleteProductsCloud);


export default router;
