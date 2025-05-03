import Users from "../model/userModel.js";
import jwt from "jsonwebtoken";

const userController = {
    loginUser: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({
                where:{
                    email: email
                }
            });

            if(!user) {
                return res.status(401).json({message: 'User not found'});
            }

            if(user.password !== password) {
                return res.status(401).json({message: 'Invalid password'});
            }

            const token = jwt.sign({
                userId: user.id_users,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE
            }
        );
        res.status(200).json({
            message: 'Login Success',
            token: token,
            user: {
                id: user.id_users,
                username: user.username,
                email: user.email,
            }
        });

        } catch (error) {
            console.error(error.message);
            
        }
    },

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