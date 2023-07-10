import Usuarios from "./Usuario.models.js";
import Noticias from "./Noticias.models.js";
import Comentarios from "./Comentarios.models.js";
import Reacciones from "./Reacciones.models.js";

//relacion uno a uno de Usuario a Noticias
Usuarios.hasMany(Noticias, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
Noticias.belongsTo(Usuarios);

//relacion uno a uno de Usuario a Reacciones
Usuarios.hasMany(Reacciones, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
Reacciones.belongsTo(Usuarios)

//relacion uno a uno de Usuario a Comentarios
Usuarios.hasMany(Comentarios, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
Comentarios.belongsTo(Usuarios);

//relacion uno a muchos de Noticias a Comentarios
Noticias.hasMany(Comentarios,{
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
Comentarios.belongsTo(Noticias);

//relacion uno a muchos de Noticias a Reacciones
Noticias.hasMany(Reacciones,{
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
Reacciones.belongsTo(Noticias);


