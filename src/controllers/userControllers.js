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
                id_users: user.id_users,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: 'lax',
            domain: 'localhost',
        })

        res.status(200).json({
            message: 'Login Success',
            // token: token,
            user: {
                id_users: user.id_users,
                username: user.username,
                email: user.email,
            }
        });

        } catch (error) {
            console.error(error.message);
            
        }
    },

    logoutUser: async (req, res) => {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000, 
                sameSite: 'lax',
                domain: 'localhost',
            })
            res.status(200).json({message: 'Logout Success'});
        } catch (error) {
            console.error(error.message);
        }
    },


    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const cekEmail = await Users.findOne({where:{email:email}});
            if(cekEmail) {
                return res.status(400).json({message: 'Email already registered'});
            };

            const user = await Users.create({
                username: username,
                email: email,
                password: password
            });
            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id_users: user.id_users,
                    username: user.username,
                    password: user.password
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


    updateUser: async (req, res) => {
        try {
            const { id } = req.params;

            const cekUser = await Users.findByPk(id);
            if (!cekUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const [updated] = await Users.update(req.body, {
                where: {id_users: id}
            });

            if (updated === 0) {
                return res.status(401).json({message: "No changes made"});
            }

            res.status(200).json({message: 'User updated successfully'});
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