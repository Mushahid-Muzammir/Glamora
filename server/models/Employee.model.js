import instance from "./config.js";
import { DataTypes } from "sequelize";

export const Employees = instance.define("Employees", {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Employees;