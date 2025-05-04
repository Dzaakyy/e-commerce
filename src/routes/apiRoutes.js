import express from 'express';
const router = express.Router();
import cartController from '../controllers/cartControllers.js';
import productController from '../controllers/productControllers.js';
import categoryController from '../controllers/categoryControllers.js';
import userController from '../controllers/userControllers.js';
import categoryProductController from '../controllers/categoryProductControllers.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validateUser, validateProduct, validateCategory, validateCart, validateLogin } from '../middleware/validationMiddleware.js';



// Users
router.post('/login',validateLogin, userController.loginUser);
router.post('/register', validateUser, userController.registerUser);
router.post('/logout', authenticateToken, userController.logoutUser);
router.get('/profile', authenticateToken, userController.profileUser);


router.get('/users', userController.getAllUsers);
router.put('/users/:id', authenticateToken, validateUser, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deletedUser);


// Products
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

router.post('/products', authenticateToken, validateProduct, productController.createProduct);
router.put('/products/:id', authenticateToken, validateProduct, productController.updateProduct);
router.delete('/products/:id', authenticateToken, validateProduct, productController.deleteProduct);


// Category
router.get('/category', categoryController.getAllCategory);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/category', authenticateToken, validateCategory, categoryController.addCategory);
router.put('/category/:id', authenticateToken, validateCategory, categoryController.updateCategory);
router.delete('/category/:id', authenticateToken, validateCategory, categoryController.deleteCategory);


// Category Product
router.get('/category-product/elektronik', categoryProductController.getElektronik);
router.get('/category-product/fashion-pria', categoryProductController.getFashionPria);
router.get('/category-product/fashion-wanita', categoryProductController.getFashionWanita);
router.get('/category-product/perabotan', categoryProductController.getPerabotan);
router.get('/category-product/olahraga', categoryProductController.getOlahraga);
router.get('/category-product/kesehatan', categoryProductController.getKesehatan);
router.get('/category-product/mainan', categoryProductController.getMainan);
router.get('/category-product/makanan', categoryProductController.getMakanan);
router.get('/category-product/otomotif', categoryProductController.getOtomotif);
router.get('/category-product/buku', categoryProductController.getBuku);


// Cart
router.get('/cart/:userId',authenticateToken ,cartController.getCart);
router.post('/cart/add', authenticateToken, validateCart, cartController.addToCart);
router.put('/cart/:userId/items/:productId', authenticateToken, validateCart, cartController.updateCart);
router.delete('/cart/:userId/items/:productId', authenticateToken, validateCart, cartController.removeFromCart);
router.delete('/cart/:userId', authenticateToken, validateCart, cartController.clearCart);



export default router;