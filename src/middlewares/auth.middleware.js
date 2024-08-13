import jwt from 'jsonwebtoken';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js'
import {Session} from '../models/session.model.js'


export const verifyJWT = async(req, res, next)=> {
    const token = req.headers["authorization"];
    if(!token) {
       return next(new ApiError("Unauthorized request", 401));
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const session = await Session.findOne({ token });
        if (!session) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findById(session.userId);
         if(!user) {
            return next(new ApiError("Unauthorized", 401));
         }
        req.user = user;
        next()
    } catch (error) {
        console.error("error", error);
        next(error);
    }
}