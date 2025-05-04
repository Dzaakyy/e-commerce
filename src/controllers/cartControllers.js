import redisClient from '../config/redisConfig.js'; 
import Users from '../model/userModel.js';
import Products from '../model/productModel.js';

const cartController = {
    addToCart: async (req, res) => {
        try {
            const { userId, productId, quantity} = req.body;

            const cekUser = await Users.findByPk(userId);
            if(!cekUser) {
                return res.status(404).json({message: 'User not found'});
            }

            const cekProduct = await Products.findByPk(productId);
            if(!cekProduct) {
                return res.status(404).json({message: 'Product not found'});
            }

            if(cekProduct.stock <= 0) {
                return res.status(400).json({message: 'Product out of stock'});
            }
            
            const key = `cart:${userId}`;
            await redisClient.hSet(key, productId, quantity);
            res.status(200).json({ 
                message: 'Product added to cart successfully',
                product: {
                    id_products: productId,
                    name: cekProduct.name,
                    quantity: quantity,
                    stock: cekProduct.stock,
                    price: cekProduct.price,
                }
            }); 
        } catch (error) {
            res.status(500).json({ message: 'Error adding product to cart', error });
        }
    },

    getCart: async (req, res) => {
        try {
            const {userId} = req.params;
            const key = `cart:${userId}`;
            const cart = await redisClient.hGetAll(key);
            res.status(200).json({ message: 'Cart retrieved successfully', cart });  
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve cart', error });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const { userId, productId } = req.params;
            const key = `cart:${userId}`;
            await redisClient.hDel(key, productId);
            res.status(200).json({ message: 'Product removed from cart successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing product from cart', error });
        }
    },

    clearCart: async (req, res) => {
        try {
            const {userId} = req.params;
            const key = `cart:${userId}`;
            await redisClient.del(key);
            res.status(200).json({ message: 'Cart cleared successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error clearing cart', error });
        }
    }
};

export default cartController;