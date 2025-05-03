import Users from "../model/userModel.js";

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const response = await Users.findAll()
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const response = await Users.findOne({
                where: {
                    id_users:req.params.id
                }
            })
            res.status(200).json(response);
        } catch (error) {
            console.error(error.message);
        }
    },

    createUser: async (req, res) => {
        try {
            await Users.create(req.body);
            res.status(201).json({ message: 'User added successfully' });
        } catch (error) {
            console.error(error.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            await Users.update(req.body, {
                where: {
                    id_users: req.params.id
                }
            })
            res.status(201).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error(error.message);
        }
    },

    deletedUser: async (req, res) => {
        try {
            await Users.destroy({
                where: {
                    id_users: req.params.id
                }
            })
            res.status(201).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error.message);
        }
    }
};

export default userController;