import { Sequelize } from "sequelize";
import db from "../config/dbConfig.js";

const { DataTypes } = Sequelize;

const Products = db.define('products', {
    id_products: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
})

export default Products;

(async()=>{
    await db.sync();
})();
