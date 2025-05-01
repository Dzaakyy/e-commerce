const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM products');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    },

    getProductById: async (req, res) => {
        try {
            const {id} = req.params;
            const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
            if (rows.length === 0 ) {
                return res.status(404).json({ message : 'Product Not Found'})
            }

            res.status(200).json(rows[0])
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    }
};

module.exports = productController;