import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import Student from "../models/studentModel.js";

async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.slice(7);

    if (!token)
        return res.status(401).send({ message: "No Access!" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Check Token Exist or Not
        const tokenExist = await Student.findOne({ tokens: token });

        if (!tokenExist)
            return res.status(401).send({ message: "Session Expired!" });

        req.userId = decoded.id;
        req.tokenToRemove = token;

        next();

    } catch (error) {
        return res.status(401).send({ message: "Invalid token!" })
    }

}

export default verifyToken;