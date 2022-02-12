import { Request, Response } from "express";
import createError from "http-errors";
import Attendence from "../models/Attendence";
import Class, { IClass } from "../models/Class";
import Student, { IStudent } from "../models/Student";
import Subject, { ISubject } from "../models/Subject";
import Teacher, { ITeacher } from "../models/Teacher";
import { Req } from "../types";
interface TeacherType {
    name: string;
    subject: string;
}
let teacherWhoOpenAttendence: TeacherType = {} as TeacherType;
export const provideClasses = async (req: Req | any, res: Response) => {
    const id = req.user.aud;
    let classes: string[] = [];
    const teacher: ITeacher = await Teacher.findOne({ _id: id }).populate(
        "classes"
    );
    if (!teacher) throw new createError.NotFound("no teacher found");
    for (let _class of teacher.classes) {
        classes.push(_class.name);
    }

    res.json(classes);
};

export const openAttendence = async (req: Req | any, res: Response) => {
    if (teacherWhoOpenAttendence.name && teacherWhoOpenAttendence.subject)
        throw new createError.Conflict(
            `${teacherWhoOpenAttendence.name} is taking attendence for ${teacherWhoOpenAttendence.subject}`
        );
    const teacher = req.user.aud;
    const _class = req.query._class;
    const findTeacher: ITeacher = await Teacher.findOne({
        _id: teacher,
    }).populate("subject");
    console.log(findTeacher);
    const updateStudent = await Student.updateMany(
        {
            class: _class,
            teachers: teacher,
            subjects: findTeacher.subject,
        },
        { $set: { isAttendenceOpen: true } }
    );

    teacherWhoOpenAttendence.name = findTeacher.name;
    teacherWhoOpenAttendence.subject = findTeacher.subject.name;
    res.json({ message: "attendence sheet presented" });
};
// check for the ongoing attendence
export const ongoingAttendence = async (req: Req | any, res: Response) => {
    const checkOngoingAttendence: IStudent = await Student.findOne({
        _id: req.user.aud,
    }).lean();
    if (!checkOngoingAttendence)
        throw new createError.InternalServerError("opps!! No student found");
    if (!checkOngoingAttendence.isAttendenceOpen)
        throw new createError.NotFound("No any Attendence is currently open");
    const formateData = {
        ...checkOngoingAttendence,
        teacher: teacherWhoOpenAttendence.name,
        subject: teacherWhoOpenAttendence.subject,
    };
    res.json({
        formateData,
    });

    // TODO:work here and send back response to student dashboard
};
export const handlePresent = async (req: Req | any, res: Response) => {
    const student = req.user.aud;
    const subject: ISubject = await Subject.findOne({
        name: req.query.subject,
    });
    const studentDetails: IStudent = await Student.findOne({ _id: student });
    if (!studentDetails.isAttendenceOpen)
        throw new createError.MethodNotAllowed("attendence is not open");
    const _class: IClass = await Class.findOne({ name: studentDetails.class });
    const teacher: ITeacher = await Teacher.findOne({
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
export const closeAttendence = async (req: Req | any, res: Response) => {
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
    teacherWhoOpenAttendence.name = "";
    teacherWhoOpenAttendence.subject = "";

    console.log("close:" + teacherWhoOpenAttendence);
    res.json({ message: "attendence closed" });
};

export const viewAttendence = async (req: Req | any, res: Response) => {
    const _class = req.query._class;
    const classId = await Class.findOne({ name: _class }).select("_id");
    const students: any = await Attendence.find({
        teacher: req.user.aud,
        class: classId,
    })
        .lean()
        .populate("student");
    const studentDetails = await students.map(
        (students: { student: {}; attendenceCount: Number }) => {
            const formateData = [];

            formateData.push({
                ...students.student,
                attendenceCount: students.attendenceCount,
            });
            return formateData;
        }
    );
    const flatData = studentDetails.flat();
    console.log(flatData);
    res.json(flatData);
};
