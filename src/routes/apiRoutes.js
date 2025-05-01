const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers');
const productController = require('../controllers/productControllers');

// Products
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById)

// Cart
router.post('/cart/add', cartController.addToCart);
router.get('/cart/:userId', cartController.getCart);
router.delete('/cart/:userId/items/:productId', cartController.removeFromCart);
router.delete('/cart/:userId', cartController.clearCart);

module.exports = router;