import Noticias from "../models/Noticias.models.js";
import Reacciones from "../models/Reacciones.models.js";
import Usuario from "../models/Usuario.models.js";
import {Sequelize, literal} from "sequelize";
import fs from "fs";

export const findAllReacciones = async (req, res) => {
    try {
        const reaccion = await Reacciones.findAll({
            attributes: [
                'noticiaId',
                'usuarioId',
                [Sequelize.literal('SUM(CASE WHEN "like" THEN 1 ELSE 0 END)'), 'likes'],
                [Sequelize.literal('SUM(CASE WHEN "dislike" THEN 1 ELSE 0 END)'), 'dislikes']
            ],
            include: [
                { model: Noticias, attributes: [] }
            ],
            where: { status: true },
            group: ['reacciones.noticiaId', 'reacciones.usuarioId'],
            order: [['noticiaId', 'DESC']],
        });

        res.json({ code: 200, message: "OK", data: reaccion });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Error al consultar las reacciones. - error: ${error}`,
        });
    }
};

export const addReacciones = async (req, res) => {
    try {
        let { like, dislike, usuarioId, noticiaId } = req.body;
        //req.nombreImagen -> viene desde middleware
        //req.pathImagen ->viene desde middleware

        let usuario = await Usuario.findByPk(usuarioId);
        let noticia = await Noticias.findByPk(noticiaId);

        if (!usuario || !noticia) {
            return res.status(403).send(`Usuario o Noticia no existe`);
        }

        let reaccionCreada = await Reacciones.create({
            like,
            dislike,
        });

        await usuario.addReacciones(reaccionCreada);
        await noticia.addReacciones(reaccionCreada);

        res.status(201).json({
            code: 201,
            message: `reaccion creado con éxito -> id: ${reaccionCreada.id}`
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al crear reaccion en la base de datos. " + error,
        });
    }
};

/* export const editReacciones = async(req, res) => {
    try{
        let {id} = req.params;
        let { nombre, descripcion, precio } = req.body;
        let reaccion = await Reacciones.findByPk(id);

        if(!reaccion){
            return res.status(404).json({code:404, message: 'reaccion no encontrado.'})
        }
        if(req.nombreImagen){
            fs.unlinkSync(req.pathBasic + '/' + reaccion.img)
        }else if(!req.nombreImagen){
            console.log('no se entrego imagen')
            req.nombreImagen = reaccion.img,
            req.pathImagen = reaccion.rutaImagen
        }
        await reaccion.update(
            {
            nombre,
            descripcion,
            precio: Number(precio),
            img: req.nombreImagen,
            rutaImagen: req.pathImagen,
            publicIdImagen: 0,
            },
            {where: {id}}
        );
        res.status(201).json({
            code:201,
            message:`Reacciones ${reaccion.nombre} se actualizo con exito.`
        })

    }catch(error){
        fs.unlinkSync(req.pathImagen);
        console.log(req.pathImagen + ' fs exitoso')
        res.status(500).send({ 
            code: 500, 
            message: `Reacciones no se pudo editar - error: \n ${error}`
        });
    }
}

export const changeStatus = async (req, res) => {
    try {
      let { id } = req.params;
      let {status} = req.body
      await Reacciones.update(
        {status},
        {where: {id}}
        )
      res.status(201).json(`Reacciones con id: ${id} ha sido anulado/activado: ${status}.`)
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `Reacciones no se pudo anular - error: \n ${error}`
      });
    }
  }

export const deleteReacciones = async(req, res) => {
    try {
        let {id} = req.params;
        let reaccion = await Reacciones.findByPk(id);
        if(!reaccion){
            return res.status(404).send('No existe ese reaccion');
        }
        let nombre = reaccion.nombre
        fs.unlinkSync(req.pathBasic + '/' + reaccion.img)
        await reaccion.destroy();

        res.status(200).json({
            code:200,
            message: `Reacciones con id: ${id} y nombre: ${nombre} - ha sido eliminado.`
        })

    }catch(error){
        res.status(500).send({ 
            code: 500, 
            message: `Reacciones no se pudo eliminar - error: \n ${error}`
        });
    }
}
 */