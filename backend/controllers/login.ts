import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Teacher from "../models/Teacher";
import Student from "../models/Student";
import { access } from "fs";
dotenv.config();

let refreshTokens: string[] = [];
const generateAccessToken = (_email: string) => {
    return jwt.sign(
        { _email },
        process.env.ACCESS_TOKEN_SECRET as unknown as string,
        { expiresIn: "1m" }
    );
};
export const login = async (req: Request, res: Response) => {
    const { email, password, rollNumber, isTeacher } = req.body;
    let user;
    if (req.body.isTeacher) {
        user = await Teacher.findOne({
            email,
        }).lean();
    } else {
        user = await Student.findOne({
            email,
            rollNumber,
        });
    }
    if (!user) res.status(400).json({ error: "User not found" });

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (passwordCorrect) {
        const accessToken = generateAccessToken(email);
        const refreshToken = jwt.sign(
            email,
            process.env.REFRESH_TOKEN_SECRET as unknown as string
        );
        refreshTokens.push(refreshToken);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
        // TODO: Update the user
    }
};
export const generateNewToken = (req: Request, res: Response) => {
    // code for the refresh token

    const refreshToken = req.body.token;
    if (refreshToken === null) return res.status(401);
    if (!refreshTokens.includes(refreshToken)) return res.status(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as unknown as string,
        (err: any, user: any) => {
            if (err) return res.status(403);
            const accessToken = generateAccessToken(user.email);
            res.json({ accessToken: accessToken });
        }
    );
};
