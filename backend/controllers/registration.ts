import express, { Request, Response } from "express";
import RegisterTeacher from "../models/RegisterTeacher";
import bcrypt from "bcryptjs";
// *REGISTER TEACHER
export const registerTeacher = async (req: Request, res: Response) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const encryptedData = { ...req.body, password: hash };
    const { name, email, password } = encryptedData;
    const createdTeacher = await RegisterTeacher.create({
        name,
        email,
        password,
    });
    console.log(createdTeacher);
    res.status(201).json({ message: "user registered successfully" });
};

// *REGISTER STUDENT
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
    res.status(201).json({ message: "user registered successfully" });
};
