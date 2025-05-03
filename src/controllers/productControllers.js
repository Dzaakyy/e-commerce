import Products from '../model/productModel.js';

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const response = await Products.findAll();
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
        }
    },

    getProductById: async (req, res) => {
        try {
            const response = await Products.findOne({
                where: {
                    id_products: req.params.id

                }
            })
            res.status(200).json(response)
        } catch (error) {
            console.error(error.message);
        }
    },

    createProduct: async (req, res) => {
        try {
            await Products.create(req.body);
            res.status(201).json({ message: 'Product added successfully' });
        } catch (error) {
            console.error(error.message);
        }
    },

    updateProduct: async (req, res) => {
        try {
            await Products.update(req.body, {
                where: {
                    id_products: req.params.id
                }
            });
            res.status(201).json({ message: 'Product updated successfully' });
        } catch (error) {
            console.error(error.message);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await Products.destroy({
                where: {
                    id_products: req.params.id
                }
            });
            res.status(201).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error(error.message);
        }
    }
};

export default productController;