import instance from "./config.js";
import { DataTypes } from "sequelize";

export const Employee_Services = instance.define("Employee_Services", {
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Employee_Services;