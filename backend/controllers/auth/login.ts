import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Teacher from "../../models/Teacher";
import Student from "../../models/Student";
dotenv.config();

import createError from "http-errors";
import { signAccessToken, signRefreshToken } from "../../helpers/jwt_helper";
export const login = async (req: Request, res: Response) => {
    const { email, password, rollNumber, isTeacher } = req.body;
    if (!email || !password) {
        throw new createError.BadRequest("email and password is required");
    }

    let user;

    if (isTeacher) {
        user = await Teacher.findOne({
            email,
        });
    } else {
        user = await Student.findOne({
            email,
            rollNumber,
        });
    }
    if (!user) throw new createError.BadRequest("You are not Registered");

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
        const role = `${isTeacher ? "teacher" : "student"}`;
        const accessToken = await signAccessToken(
            user.id as string,
            role,
            user.name as string
        );
        const refreshToken = await signRefreshToken(
            user.id as string,
            role,
            user.name as string
        );

        res.json({ accessToken, refreshToken });
    }
    throw new createError.Unauthorized("invalid email/password");
};
