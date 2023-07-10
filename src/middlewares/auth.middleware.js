import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.models.js";

export const emitToken = async (req, res, next) => {
    let { email, password } = req.body;
    let usuario = await Usuario.findOne({
        where: { email, password },
        attributes: ["id", "autor", "email"],
    });

    if (!usuario) {
        return res
            .status(400)
            .json({ code: 400, message: "Error de autenticación." });
    }
    let token = jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: usuario,
        },
        process.env.PASSWORD_SECRET
    );
    req.token = token;
    console.log('Token given')
    next();
};

export const verifyToken = (req, res, next) => {
    try {
        let { token } = req.query;
        if (!token) {
             token = req.headers["authorization"];
             if (!token)
                 return res
                     .status(400)
                     .send(
                         "ruta protegida, debe proporcionar un token de acceso."
                     );
             token = token.split(" ")[1];
             if (token.length == 0) {
                 throw new Error("No se ha proporcionado un token");
             }
        }

        jwt.verify(
            token,
            process.env.PASSWORD_SECRET,
            async (error, decoded) => {
                if (error) {
                    return res.status(401).json({
                        code: 401,
                        message: "debe proporcionar un token válido / su token puede estar expirado.",
                    });
                }

                try {
                    let usuario = await Usuario.findByPk(decoded.data.id, {
                        attributes: ["id", "autor", "email"],
                    });
                    if (!usuario) {
                        return res.status(400).json({
                            code: 400,
                            message: "Usuario ya no existe en el sistema.",
                        });
                    }
                    req.usuario = usuario;
                    console.log('Token: verificado con exito')
                    next();
                } catch (error) {
                    res.status(500).json({code: 500, message: "Error en autencicación."})
                }
            }
        );
    } catch (error) {
        return res.status(401).json({
            code: 401,
            message: error.message,
        });
    }
};