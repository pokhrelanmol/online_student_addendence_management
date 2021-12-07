import express, { Request, Response } from "express";

import Student from "../models/Student";
const app = express();

export const handlePresent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const student = await Student.findOneAndUpdate(
        { _id: id },
        { takeAttendence: true },
        { new: true, runValidators: true }
    );
    res.json({ message: "attendence updated" });
};
