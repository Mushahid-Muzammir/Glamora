import instance from "./config.js";
import { DataTypes } from "sequelize";

export const Appointments = instance.define("Appointments", {
    appointment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    booked_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    booked_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },   
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_mode: {
        type: DataTypes.STRING,
        allowNull: false,
    },  
});

export default Appointments;