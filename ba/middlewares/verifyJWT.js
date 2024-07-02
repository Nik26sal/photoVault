import jwt from 'jsonwebtoken';
import { User } from '../Model/userModel.js';

export const verifyJWT = async (req, res, next) => {
    try {
        let token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        // Verify the token
        const decodedToken = jwt.verify(token,'jofjsdskvdjhwslvndkblvnhdlvbdolbhdpbhdolbnflkndlbdbidlbn');

        if (!decodedToken) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Fetch user from database based on decoded token
        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        // Attach user object to the request for further handling in routes
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Invalid Access Token" });
    }
};
