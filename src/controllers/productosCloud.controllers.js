import Producto from "../models/Reacciones.models.js";
import { deleteFileCloud } from "../middlewares/uploadCloud.middleware.js";


export const addProductosCloud = async (req, res) => {
    //console.log(req.body);
    let { nombre, descripcion, precio } = req.body;
    //req.nombreImagen -> viene desde middleware
    //req.pathImagen ->viene desde middleware
    //req.imagenId -> id de la imagen en cloudinary
    try {
        let nuevoProducto = {
            nombre,
            descripcion,
            precio: Number(precio),
            img: req.nombreImagen,
            rutaImagen: req.pathImagen,
            publicIdImagen: req.imagenId,
        };

        let productoCreado = await Producto.create(nuevoProducto);

        res.status(201).json({
            code: 201,
            message: "Producto creado con éxito.",
            data: productoCreado,
        });
    } catch (error) {
        deleteFileCloud(req.imagenId);
        res.status(500).json({
            code: 500,
            message: `Error al crear el producto en la base de datos. - error: \n ${error}`,
        });
    }
};

export const editProductCloud = async(req, res) => {
    try{
        let {id} = req.params;
        let { nombre, descripcion, precio } = req.body;
        let producto = await Producto.findByPk(id);

        if(!producto){
            return res.status(404).json({code:404, message: 'Producto no encontrado.'})
        }
        if(req.nombreImagen){
            deleteFileCloud(producto.publicIdImagen)
        }else if(!req.nombreImagen){
            console.log('no se entrego imagen')
            req.nombreImagen = producto.img,
            req.pathImagen = producto.rutaImagen
        }

        await producto.update(
            {
            nombre,
            descripcion,
            precio: Number(precio),
            img: req.nombreImagen,
            rutaImagen: req.pathImagen,
            publicIdImagen: req.imagenId,
            },
            {where: {id}}
        );
        res.status(201).json({
            code:201,
            message:`Producto ${producto.nombre} se actualizo con exito.`
        })

    }catch(error){
        deleteFileCloud(req.imagenId);
        res.status(500).send({ 
            code: 500, 
            message: `producto con id y nombre: ${id} - ${nombre} no se pudo editar - error: \n ${error}`
        });
    }
}

export const deleteProductsCloud = async(req, res) => {
    try {
        let {id} = req.params;
        let producto = await Producto.findByPk(id);
        if(!producto){
            return res.status(404).send('No existe ese producto');
        }
        let nombre = producto.nombre
        deleteFileCloud(req.imagenId)

        res.status(200).json({
            code:200,
            message: `producto con id y nombre: ${id} - ${nombre} ha sido eliminado.`
        })

    }catch(error){
        res.status(500).send({ 
            code: 500, 
            message: `producto con id y nombre: ${id} - ${nombre} no se pudo eliminar - error: \n ${error}`
        });
    }
}
