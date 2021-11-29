import express, { Request, Response } from "express";
export const teacherDashboard = (req: Request, res: Response) => {
    res.json({ message: "teachers dashboard" });
};
export const getStudents = (req: Request, res: Response) => {
    res.json({ message: "get all students along with catagory" });
    // TODO: fetch all students and organise them accor to class
};

export const addStudent = (req: Request, res: Response) => {
    res.json({ message: "add student and catagorize them according to class" });
    // TODO:add  student and catagorize them according to class
    // TODO:create class collections dynamically
};
