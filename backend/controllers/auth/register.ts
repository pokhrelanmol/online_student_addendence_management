import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Teacher from "../../models/Teacher";
import Student from "../../models/Student";
import Class from "../../models/Class";
import Subject from "../../models/Subject";
import createError from "http-errors";
import { signAccessToken, signRefreshToken } from "../../helpers/jwt_helper";

// *REGISTER TEACHER
export const registerTeacher = async (req: Request, res: Response) => {
    const { name, email, password, classes, subject } = req.body;
    if (!name || !email || !password || !classes || !subject) {
        throw new createError.BadRequest("all fields are required");
    }
    // check for teacher if aready exits
    const checkDuplicate = await Teacher.findOne({ email });
    if (checkDuplicate)
        throw new createError.Conflict("teacher already registered");
    // if the subject and class is already in the subject model then refer it otherwise create a new one and refer
    let _subject;
    const _subjectPresent = await Subject.findOne({ name: subject });
    if (_subjectPresent) {
        _subject = _subjectPresent.id;
    } else {
        const newSubject = await Subject.create({ name: subject });
        if (!newSubject)
            throw new createError.InternalServerError(
                "subject creation failed"
            );
        _subject = newSubject.id;
    }
    // handle class
    let _classes: string[] = [];
    const populateClasses = async () => {
        for (let _class of classes) {
            const classPresent = await Class.findOne({ name: _class });
            if (classPresent) {
                _classes.push(classPresent.id);
            } else {
                const newClass = await Class.create({ name: _class });
                if (newClass) {
                    _classes.push(newClass.id);
                } else {
                    new createError.InternalServerError(
                        "could not create class"
                    );
                }
            }
        }
    };
    await populateClasses();
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const teacher = await Teacher.create({
        ...req.body,
        subject: _subject,
        classes: _classes,
        password: passwordHash,
    });

    const accessToken = await signAccessToken(
        teacher.id as string,
        "teacher",
        teacher.name as string
    );
    const refreshToken = await signRefreshToken(
        teacher.id as string,
        "teacher",
        teacher.name as string
    );

    res.status(201).json({ accessToken, refreshToken });
};

// *REGISTER STUDENT

export const regsiterStudent = async (req: Request, res: Response) => {
    const { _class, rollNumber, email, password } = req.query;
    if (_class) {
        const students: any = await Student.find({ class: _class });
        if (students.length > 0) {
            res.status(200).json({ students });
        } else {
            throw new createError.NotFound("no students in class");
        }
    } else if (rollNumber && email && !password) {
        const findMatch = await Student.findOne({
            rollNumber: Number(rollNumber),
            email,
        });

        // TODO: work in this place

        if (findMatch) {
            if (findMatch.isRegistered)
                throw new createError.Conflict(
                    "student already registered try login  "
                );

            res.json({ message: "student found", findMatch });
        } else {
            throw new createError.NotFound();
        }
    } else if (rollNumber && email && password) {
        const passwordHash = await bcrypt.hash(password as string, 10);
        const student = Student.findOneAndUpdate(
            { rollNumber: Number(rollNumber), email },
            { password: passwordHash, isRegistered: true },
            { new: true, runValidators: true },
            async (err, user: any) => {
                if (err) throw new createError.InternalServerError();
                const accessToken = await signAccessToken(
                    user.id as string,
                    "student",
                    user.name as string
                );
                const refreshToken = await signRefreshToken(
                    user.id as string,
                    "student",
                    user.name as string
                );

                console.log(accessToken);
                res.status(201).json({
                    accessToken,
                    refreshToken,
                    message: "Student registered",
                });
            }
        );
    }
};
