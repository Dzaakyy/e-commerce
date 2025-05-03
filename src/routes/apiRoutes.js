import express from 'express';
const router = express.Router();
import cartController from '../controllers/cartControllers.js';
import productController from '../controllers/productControllers.js';
import categoryController from '../controllers/categoryControllers.js';
import userController from '../controllers/userControllers.js';

// Users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deletedUser);

// Products
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById)
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Category
router.get('/category', categoryController.getAllCategory);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/category', categoryController.addCategory);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

// Cart
router.post('/cart/add', cartController.addToCart);
router.get('/cart/:userId', cartController.getCart);
router.delete('/cart/:userId/items/:productId', cartController.removeFromCart);
router.delete('/cart/:userId', cartController.clearCart);



export default router;