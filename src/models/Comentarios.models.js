import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";


const Comentarios = sequelize.define(
    "comentarios",
    {
        texto: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    },
    {
        timestamps: true,
    }
);

export default Comentarios;