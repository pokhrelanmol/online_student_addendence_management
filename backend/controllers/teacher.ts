import express, { Request, Response } from "express";

import Student from "../models/Student";
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
    res.json({ message: "student added" });
};

export const handlePresent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const student = await Student.findOneAndUpdate(
        { _id: id },
        { takeAttendence: true },
        { new: true, runValidators: true }
    );
    res.json({ message: "attendence updated" });
};
