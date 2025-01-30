import instance from "./config.js";
import { DataTypes } from "sequelize";

export const Services = instance.define("Services", {
    service_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    service_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    decription: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    timestamps:false
});

export default Services;