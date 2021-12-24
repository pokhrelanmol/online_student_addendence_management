import express, { Request, Response } from "express";
import createError from "http-errors";
import { verifyAccessToken } from "../helpers/jwt_helper";
import Student from "../models/Student";
import Teacher from "../models/Teacher";
export const createStudent = async (req: any, res: Response) => {
    const teacher = await Teacher.findOne({ _id: req.user.aud });
    if (!teacher) throw new createError.NotFound("teacher not found");
    // check if student  already exist
    const _student = await Student.findOne({ email: req.body.email });
    if (!_student) {
        const student = await Student.create({
            ...req.body,
            teachers: [teacher],
        });
        res.status(201).json({ student });
    } else {
        /* only update the reference in the teachers array because it 
        could be possibe that another teacher have already created that student  */
        const student = await Student.findOneAndUpdate(
            { email: req.body.email },
            { $push: { teachers: teacher } },
            { new: true }
        );
        res.status(201).json({ student });
    }
};
export const getStudents = async (req: any, res: Response) => {
    // req.user is comming from jwt after verification
    // find the students who have a teacher as logged in user
    const teacher: any = await Teacher.findOne({ _id: req.user.aud });

    const student = await Student.find({ teachers: teacher });
    res.status(200).json(student);
};
