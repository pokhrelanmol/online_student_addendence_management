import express, { Request, Response } from "express";
import Student from "../models/Student";
import Teacher from "../models/Teacher";
export const createStudent = async (req: Request, res: Response) => {
    const { email } = req.params;
    const teacher = await Teacher.findOne({ email });
    if (teacher === null)
        res.status(404).json({ message: "teacher not found" });
    // check for student if already exist
    const _student = await Student.findOne({ email: req.body.email });
    if (_student === null) {
        const student = await Student.create({
            ...req.body,
            teachers: [teacher],
        });
        res.status(201).json(student);
    } else {
        // only update the reference in the teachers array
        const student = await Student.findOneAndUpdate(
            { email: req.body.email },
            { $push: { teachers: teacher } },
            { new: true }
        );
        res.status(201).json(student);
    }
};
export const getStudents = async (req: Request, res: Response) => {
    console.log(req.body);
    // find the students who have a teacher as logged in user
    const teacher: any = await Teacher.findOne({ email: req.body.email });
    const student = await Student.find({ teachers: teacher });
    res.status(201).json(student);
};
