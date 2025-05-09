import redisClient from '../config/redisConfig.js';
import Users from '../model/userModel.js';
import Products from '../model/productModel.js';

const cartController = {
    addToCart: async (req, res) => {
        try {
            // const { userId, productId, quantity} = req.body;

            const userId = req.user.id_users;

            const { productId, quantity } = req.body;

            const cekUser = await Users.findByPk(userId);
            if (!cekUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const cekProduct = await Products.findByPk(productId);
            if (!cekProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (cekProduct.stock <= 0) {
                return res.status(400).json({ message: 'Product out of stock' });
            }

            if (quantity > 0 && quantity > cekProduct.stock) {
                return res.status(400).json({
                    message: 'Quantity exceeds available stock',
                    maxQuantity: cekProduct.stock
                });
            }

            const key = `cart:${userId}`;

            const currentQuantity = await redisClient.hGet(key, productId);
            const newQuantity = currentQuantity
                ? parseInt(currentQuantity) + parseInt(quantity)
                : parseInt(quantity);

            if (newQuantity > cekProduct.stock) {
                return res.status(400).json({
                    message: 'Total quantity exceeds available stock',
                    maxQuantity: cekProduct.stock,
                    currentQuantity: currentQuantity || 0
                });
            }

            await redisClient.hSet(key, productId, newQuantity.toString());
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
            const userId = req.user.id_users;

            const cekUser = await Users.findByPk(userId);
            if (!cekUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            const key = `cart:${userId}`;
            const cart = await redisClient.hGetAll(key);

            const productIds = Object.keys(cart);
            const products = await Products.findAll({
                where: {
                    id_products: productIds
                },
                attributes: ['id_products', 'name']
            })

            const formattedCart = products.map(product => {
                return {
                    id_products: product.id_products,
                    name: product.name,
                    quantity: cart[product.id_products],
                }
            })

            res.status(200).json({
                message: 'Cart retrieved successfully', formattedCart
            });
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve cart', error });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const userId = req.user.id_users;
            const { productId } = req.params;

            if (!userId || !productId) {
                return res.status(400).json({ message: 'User ID and Product ID are required' });
            }

            const cekUser = await Users.findByPk(userId);
            if (!cekUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            const cekProduct = await Products.findByPk(productId);
            if (!cekProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const key = `cart:${userId}`;

            const cekProductdiKeranjang = await redisClient.hExists(key, productId);
            if (!cekProductdiKeranjang) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }
            await redisClient.hDel(key, productId);
            res.status(200).json({
                message: 'Product removed from cart successfully',
                product: {
                    id_products: productId,
                    name: cekProduct.name,
                    stock: cekProduct.stock,
                    price: cekProduct.price,
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error removing product from cart', error });
        }
    },


    updateCart: async (req, res) => {
        try {
            const userId = req.user.id_users;
            const { productId } = req.params;
            const { quantity } = req.body;

            if (!userId || !productId || quantity <= 0) {
                return res.status(400).json({ message: 'User ID, Product ID and quantity are required' });
            }

            if (!Number.isInteger(quantity) < 0) {
                return res.status(400).json({ message: 'Quantity must be a positive integer' });
            }

            const product = await Products.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (quantity > 0 && quantity > product.stock) {
                return res.status(400).json({
                    message: 'Quantity exceeds available stock',
                    maxQuantity: product.stock
                });
            }

            const key = `cart:${userId}`;

            const currentQuantity = await redisClient.hGet(key, productId);


            if (currentQuantity === null) {
                return res.status(404).json({
                    message: 'Product not found in cart - cannot update',
                });
            }

            const checkQuantity = await redisClient.hGet(key, productId);
            const quantityEntered = checkQuantity ? parseInt(checkQuantity, 10) : null;

            if (quantityEntered !== null && quantityEntered === quantity) {
                return res.status(400).json({
                    message: 'No changes made, quantity is the same as before',
                    currentQuantity: quantityEntered
                });
            }



            if (quantity <= 0) {
                await redisClient.hDel(key, productId);
                res.status(200).json({
                    message: 'Product removed from cart successfully',
                    product: {
                        id_products: productId,
                        name: product.name,
                        stock: product.stock,
                        quantity: 0
                    }

                });
            }

            await redisClient.hSet(key, productId, quantity);

            res.status(200).json({
                message: 'Cart updated successfully',
                product: {
                    id_products: productId,
                    name: product.name,
                    stock: product.stock,
                    quantity: quantity,
                }

            })

        } catch (error) {
            res.status(500).json({ message: 'Error updating cart', error });

        }
    },

    clearCart: async (req, res) => {
        try {
            const userId = req.user.id_users;
            const key = `cart:${userId}`;
            await redisClient.del(key);
            res.status(200).json({ message: 'Cart cleared successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error clearing cart', error });
        }
    }
};

export default cartController;