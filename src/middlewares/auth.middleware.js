import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'

const authentication =async(req,res,next)=>{
    const token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.userId).select('-password');

        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized, no user found');
        }

        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
};

export default authentication;