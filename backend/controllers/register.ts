import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Teacher from "../models/Teacher";
import Student from "../models/Student";
// *REGISTER TEACHER
export const registerTeacher = async (req: Request, res: Response) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const data = { ...req.body, password: hash };
    const { name, email, password, classes, subjects } = data;
    const teacher = await Teacher.create({
        name,
        email,
        classes,
        subjects,
        password,
    });
    res.status(201).json({ message: "teacher registered successfully" });
};

// *REGISTER STUDENT
export const regsiterStudent = async (req: Request, res: Response) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const data = { ...req.body, password: hash };
    const { email, rollNumber, password } = data;
    // * email need to be provided by teacher baecause there can be a student with same name and roll number in different class
    const student: any = await Student.findOne({ email, rollNumber });
    if (!student) {
        res.status(404).json({
            message: "can't find You, Ask your teacher to add You In the class",
        });
    } else if (student.isRegistered) {
        res.status(409).json({
            message: "Already registered",
        });
    } else {
        //   TODO: Update student here
        const student = await Student.findOneAndUpdate(
            { email, rollNumber },
            { password, isRegistered: true },
            { new: true, runValidators: true }
        );
        res.status(201).json(student);
    }
};
