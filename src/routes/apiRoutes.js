import express from 'express';
const router = express.Router();
import cartController from '../controllers/cartControllers.js';
import productController from '../controllers/productControllers.js';
import categoryController from '../controllers/categoryControllers.js';
import userController from '../controllers/userControllers.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validateUser, validateProduct, validateCategory, validateCart, validateLogin } from '../middleware/validationMiddleware.js';



// Users
router.post('/login',validateLogin, userController.loginUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', authenticateToken, validateUser, userController.createUser);
router.put('/users/:id', authenticateToken, validateUser, userController.updateUser);
router.delete('/users/:id', authenticateToken, validateUser, userController.deletedUser);

// Products
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById)
router.post('/products', authenticateToken, validateProduct, productController.createProduct);
router.put('/products/:id', authenticateToken, validateProduct, productController.updateProduct);
router.delete('/products/:id', authenticateToken, validateProduct, productController.deleteProduct);

// Category
router.get('/category', categoryController.getAllCategory);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/category', authenticateToken, validateCategory, categoryController.addCategory);
router.put('/category/:id', authenticateToken, validateCategory, categoryController.updateCategory);
router.delete('/category/:id', authenticateToken, validateCategory, categoryController.deleteCategory);

// Cart
router.get('/cart/:userId', cartController.getCart);
router.post('/cart/add', authenticateToken, validateCart, cartController.addToCart);
router.delete('/cart/:userId/items/:productId', authenticateToken, validateCart, cartController.removeFromCart);
router.delete('/cart/:userId', authenticateToken, validateCart, cartController.clearCart);



export default router;