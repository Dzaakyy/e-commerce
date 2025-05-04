import jwt from 'jsonwebtoken';
import Users from '../model/userModel.js';

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
        return res.status(401).json({message: 'Access denied. No token provided.'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await Users.findByPk(decoded.id_users);

        if (!user) {
            return res.status(404).json({message: 'User not found.'});
        }

        req.user = {
            id_users: decoded.id_users,
        }
        next();
    } catch (error) {
       console.error(error.message);
       if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
    }
    
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

        return res.status(500).json({message: 'Invalid token.'});
    }
};