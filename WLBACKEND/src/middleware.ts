import type { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config.js"

 export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if(!authHeader) {
        return res.status(401).json({ 
            message: "No token provided" 
        });
    } 
    const token = authHeader.split(" ")[1] as string;
    try{
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as JwtPayload & { _id: string };
        req.userId = decoded._id;
        next()
    }
    catch{
        res.status(403).json({
            message:"Invalid token"
        })
    }
 }