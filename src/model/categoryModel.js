import { Sequelize } from "sequelize";
import db from "../config/dbConfig.js";

const { DataTypes } = Sequelize;

const Category = db.define('category', {
    id_category: {
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
}, {
    freezeTableName: true,
    timestamps: false
})

export default Category;

(async()=>{
    await db.sync();
})();
