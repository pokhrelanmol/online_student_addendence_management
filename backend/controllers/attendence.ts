import { Request, Response } from "express";
import createError from "http-errors";
import { create } from "ts-node";
import Attendence from "../models/Attendence";
import Class from "../models/Class";
import Student from "../models/Student";
import Subject from "../models/Subject";
import Teacher from "../models/Teacher";

export const provideClasses = async (req: any, res: Response) => {
    const id = req.user.aud;
    let classes: string[] = [];
    const teacher = await Teacher.findOne({ _id: id }).populate("classes");
    if (!teacher) throw new createError.NotFound("no teacher found");
    for (let _class of teacher.classes) {
        classes.push(_class.name);
    }

    res.json(classes);
};

export const openAttendence = async (req: any, res: Response) => {
    const teacher = req.user.aud;
    const _class = req.query._class;
    const findTeacher: any = await Teacher.findOne({ _id: teacher });
    const updateStudent = await Student.updateMany(
        {
            class: _class,
            teachers: teacher,
            subjects: findTeacher.subject,
        },
        { $set: { isAttendenceOpen: true } }
    );
    res.json({ message: "attendence sheet presented" });
};
// TODO: handle student present
export const handlePresent = async (req: any, res: Response) => {
    const student = req.user.aud;
    const subject = await Subject.findOne({ name: req.query.subject });
    const studentDetails = await Student.findOne({ _id: student });
    if (!studentDetails.isAttendenceOpen)
        throw new createError.MethodNotAllowed("attendence is not open");
    const _class = await Class.findOne({ name: studentDetails.class });
    const teacher = await Teacher.findOne({
        subject: subject.id,
        classes: _class.id,
    });

    const payload = {
        student,
        subject: subject.id,
        teacher: teacher.id,
        class: _class.id,
    };

    const findStudent = await Attendence.findOne(payload);

    if (findStudent) {
        const updateAttendence = await Attendence.findOneAndUpdate(payload, {
            attendenceCount: findStudent.attendenceCount + 1,
        });
        res.send("success");
    } else {
        const createNewStudent = await Attendence.create({
            ...payload,
            attendenceCount: 1,
        });

        res.send("success");
    }

    const updateStudent = await Student.findOneAndUpdate(
        { _id: student, subjects: subject },
        { isAttendenceOpen: false }
    );
};
export const closeAttendence = async (req: any, res: Response) => {
    const teacher = req.user.aud;
    const _class = req.query._class;
    const findTeacher: any = await Teacher.findOne({ _id: teacher });
    const updateStudent = await Student.updateMany(
        {
            class: _class,
            teachers: teacher,
            subjects: findTeacher.subject,
        },
        { $set: { isAttendenceOpen: false } }
    );
    res.json({ message: "attendence closed" });
};
