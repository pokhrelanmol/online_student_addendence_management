import express, { Request, Response } from "express";
import RegisterTeacher from "../models/RegisterTeacher";
import bcrypt from "bcryptjs";
// *TEACHER LOGIN
export const loginTeacher = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loggedTeacher = await RegisterTeacher.findOne({
        email,
    }).lean();
    if (!loggedTeacher) {
        res.status(400).json({ error: "You are not registered" });
    }
    const checkPasword = await bcrypt.compare(password, loggedTeacher.password);
    if (checkPasword) {
        console.log(loggedTeacher);
        res.status(200).json({ message: "login successfull" });
    } else {
        console.log("error");
        res.status(400).json({ error: "invalid username or password" });
    }
};
// * STUDENT LOGIN
export const loginStudent = async (req: Request, res: Response) => {
    const { email, roll_no, password } = req.body;
    const loggedStudent = await RegisterTeacher.findOne({
        email,
        roll_no,
    });
    const checkPasword = await bcrypt.compare(password, loggedStudent.password);
    if (checkPasword) {
        console.log(loggedStudent);
        res.status(200).json({ message: "login successfull" });
    } else {
        res.status(400).json({ error: "invalid username or password" });
    }
};
