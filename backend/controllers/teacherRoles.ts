import express, { Request, Response } from "express";

import Student from "../models/Student";
import { authTeacher } from "../middlewares/authorization";
const app = express();

interface QueryString {
    _class: string;
}
type QueryObject = { class: string } | {};
export const getStudents = async (request: Request, response: Response) => {
    const { _class } = request.query as unknown as QueryString;

    let queryObject: QueryObject = {};
    if (_class) {
        queryObject = { class: _class };
    }
    const totalStudents = await Student.find(queryObject);
    response.json({ totalStudents });
};

export const addStudent = async (req: Request, res: Response) => {
    const student = await Student.create(req.body);

    res.status(201).json({ message: "student added" });
};
