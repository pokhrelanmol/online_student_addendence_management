import express, { Request, Response } from "express";
import RegisterTeacher from "../models/RegisterTeacher";
import bcrypt from "bcryptjs";
export const registerTeacher = async (req: Request, res: Response) => {
    // handle the /registerTeacherrouter
    const hash = await bcrypt.hash(req.body.password, 10);
    const encryptedData = { ...req.body, password: hash };
    const { name, email, password } = encryptedData;
    const createdTeacher = await RegisterTeacher.create({
        name,
        email,
        password,
    });
    console.log("user registered");
    res.json(createdTeacher).status(201);
    return res.status(400).json({
        error: "user already exists please try another username",
    });
};
export const regsiterStudent = (req: Request, res: Response) => {
    // handle the /registerStudent router
};
