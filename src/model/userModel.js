import { Sequelize } from "sequelize";
import db from "../config/dbConfig.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    id_users: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},{
    freezeTableName:true,
    timestamps: false
})

export default Users; 

(async()=>{
    await db.sync();
})();
