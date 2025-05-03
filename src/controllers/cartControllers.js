import redisClient from '../config/redisConfig.js'; 

const cartController = {
    addToCart: async (req, res) => {
        try {
            const { userId, productId, quantity} = req.body;
            const key = `cart:${userId}`;
            await redisClient.hSet(key, productId, quantity);
            res.status(200).json({ message: 'Product added to cart successfully' }); 
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