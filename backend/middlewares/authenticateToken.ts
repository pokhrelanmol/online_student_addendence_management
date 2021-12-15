import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = <string>req.headers["authorization"];
    // Bearer token
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "not authorize" });
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as unknown as string,
        (err, user) => {
            if (err)
                return res.status(403).json({ error: "token is not valid" });
            // TODO: how to set the type for req.user
            // req.user = user;
            next();
        }
    );
};
