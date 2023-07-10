import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";


const Reacciones = sequelize.define(
    "reacciones",
    {
        like: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        dislike: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        timestamps: true,
    }
);

export default Reacciones;
