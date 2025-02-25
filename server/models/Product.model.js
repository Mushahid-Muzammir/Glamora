import instance from "./config.js";
import { DataTypes } from "sequelize";

export const Products = instance.define("Products", {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    selling_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiry_date: {
        type: DataTypes.DATE,
        allowNull:true
    }  
}, 
{
    timestamps: false
}
);
export default Products;