import jwt from 'jsonwebtoken';
import { User } from '../Model/userModel.js';

export const verifyJWT = async (req, res, next) => {
    try {
        let token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }
        const decodedToken = jwt.verify(token,'jofjsdskvdjhwslvndkblvnhdlvbdolbhdpbhdolbnflkndlbdbidlbn');

        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Invalid Access Token" });
    }
};
