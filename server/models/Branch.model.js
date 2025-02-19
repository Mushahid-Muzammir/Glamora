import instance from "./config.js";
import { DataTypes } from "sequelize";

export const Branches = instance.define("Branches", {
    branch_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    branch_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    manager_id: {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    open_time : {
        type : DataTypes.TIME,
        allowNull : false
    },
    close_time : {
        type : DataTypes.TIME,
        allowNull : false
    },
},
{
    timestamps: false
}
);

export default Branches;