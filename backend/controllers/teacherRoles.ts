import express, { Request, Response } from "express";

import Student from "../models/Student";
import { authTeacher } from "../middlewares/authorization";
import RegisterTeacher from "../models/RegisterTeacher";
import { ObjectId } from "mongoose";
const app = express();

interface QueryString {
    _class: string;
}
type QueryObject = { class: string } | {};
interface Teacher {
    name: string;
    email: string;
    _id: ObjectId;
    password: string;
}
export const getStudents = async (request: Request, response: Response) => {
    const { _class } = request.query as unknown as QueryString;

    console.log(request.query);
    console.log(request.params);
    let queryObject: QueryObject = {};
    if (_class) {
        queryObject = { class: _class };
    }
    // authorize teacher
    const { email } = request.params;
    const checkTeacher: Teacher[] = await RegisterTeacher.find({
        email,
    });
    const totalStudents = await Student.find({
        ...queryObject,
        teacher: checkTeacher[0]._id,
    });
    console.log(totalStudents);
    if (totalStudents.length <= 0) {
        console.log("no students");
        response.status(404).json({ error: "No Students Found" });
    } else {
        response.json({ totalStudents });
    }
};

export const addStudent = async (req: Request, res: Response) => {
    const { email } = req.params;
    const checkTeacher: Teacher[] = await RegisterTeacher.find({
        email,
    });
    const data = await { ...req.body, teacher: checkTeacher[0]._id };
    const student = await Student.create(data);

    res.status(201).json({ message: "student added" });
};
