import Products from "../model/productModel.js";

const categoryProductController = {
    getElektronik: async (req, res) => {
        try {
            const response = await Products.findAll({
                where: {
                    category_id: 1
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
        }
    },

    getFashionPria: async (req, res) => {
        try {
            const response = await Products.findAll({
                where: {
                    category_id: 2
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
        }
    },

    getFashionWanita: async (req, res) => {
        try {
            const response = await Products.findAll({
                where: {
                    category_id: 3
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            
        }
    },

    getPerabotan: async (req, res) => {
        try {
            const response = await Products.findAll({
                where: {
                    category_id: 4
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            
        }
    },

    getOlahraga: async (req, res) => {
        try {
            const respone = await Products.findAll({
                where: {
                    category_id: 5
                }
            })
            res.status(200).json(respone);
        } catch (error) {
            console.error(error.message);
            
        }
    },

    getKesehatan: async (req, res) => {
        try {
            const response = await Products.findAll({
                where: {
                    category_id: 6
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            
        }
    },

    getMainan: async (req, res) => {
        try {
            const response = await Products.findAll({
                where: {
                    category_id: 7
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
        }
    },

    getMakanan: async (req, res) => {
        try {
            const response = await Products.findAll({
                where: {
                    category_id: 8
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            
        }
    },

    getOtomotif: async (req, res) => {
        try {
            const response = await Products.findAll({
                where: {
                    category_id: 9
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            
        }
    },

    getBuku: async (req, res) => {
        try {
            const response = await Products.findAll({
                where: {
                    category_id: 10
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
            
        }
    }
}

export default categoryProductController;