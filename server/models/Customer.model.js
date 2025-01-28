import instance from "./config.js";
import { DataTypes } from "sequelize";

export const Customers = instance.define("Customers", {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  loyalty_points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export default Customers;