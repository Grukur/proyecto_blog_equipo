import { Router } from "express";
import { addUsuario, login, findAllUsuarios, editUser, changeStatus, deleteUser  } from "../controllers/usuarios.controllers.js";
import {emitToken, verifyToken} from "../middlewares/auth.middleware.js"
const router = Router();



//ruta post usuarios
router.get("/", findAllUsuarios);
router.post("/", addUsuario);
router.post("/login", emitToken, login);
router.put("/", editUser);
router.delete("/", changeStatus);
router.delete("/destroy", deleteUser);

export default router;
