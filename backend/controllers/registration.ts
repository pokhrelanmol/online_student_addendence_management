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
    console.log(createdTeacher);
    res.json(createdTeacher).status(201);
};
export const regsiterStudent = async (req: Request, res: Response) => {
    // handle the /registerStudent router
    const hash = await bcrypt.hash(req.body.password, 10);
    const encryptedData = { ...req.body, password: hash };
    const { name, email, roll_no, password } = encryptedData;
    const createdStudent = await RegisterTeacher.create({
        name,
        email,
        roll_no,
        password,
    });
    console.log(createdStudent);
    res.json(createdStudent).status(201);
};
