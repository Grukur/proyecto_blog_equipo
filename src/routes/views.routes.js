import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

//ruta post usuarios
router.get(["/home", "/"], (req, res) => {
    res.render("home");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/registro", (req, res) => {
    res.render("registro");
});

router.get("/dashboard", verifyToken,  (req, res) => {
    res.render("dashboard");
});

router.get("/perfil", verifyToken, async (req, res) => {
    let usuario = req.usuario;
    res.render("perfil", {
        usuario: usuario.dataValues,
    });
});

router.get("/protegida", verifyToken, async (req, res) => {
    console.log("Entramos a la ruta.")
    res.render("protegida");
})

export default router;
