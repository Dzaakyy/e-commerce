const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then((connection) => {
        console.log('Connected to MySQL database');
        connection.release();
    })
    .catch((error) => {
        console.error('Error connecting to MySQL database:', error);
    });


module.exports = pool;