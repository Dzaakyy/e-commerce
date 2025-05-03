import Category from '../model/categoryModel.js';

const categoryController = {
    getAllCategory: async (req, res) => {
        try {
            const response = await Category.findAll()
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const response = await Category.findOne({
                where: {
                    id_category: req.params.id
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
        }
    },

    addCategory: async (req, res) => {
        try {
            await Category.create(req.body);
            res.status(201).json({ message: 'Category added successfully' });
        } catch (error) {
            console.error(error.message);
        }
    },

    updateCategory: async (req, res) => {
        try {
            await Category.update(req.body, {
                where: {
                    id_category: req.params.id
                }
            });
            res.status(201).json({ message: 'Category updated successfully' });
        } catch (error) {
            console.error(error.message);
        }
    },

    deleteCategory: async (req, res) => {
        try {
            await Category.destroy({
                where: {
                    id_category: req.params.id
                }
            })
            res.status(201).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error(error.message);
        }
    }
};

export default categoryController;