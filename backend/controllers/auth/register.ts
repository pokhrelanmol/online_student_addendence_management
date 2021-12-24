import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Teacher from "../../models/Teacher";
import Student from "../../models/Student";
import createError from "http-errors";
import { signAccessToken, signRefreshToken } from "../../helpers/jwt_helper";

// *REGISTER TEACHER
export const registerTeacher = async (req: Request, res: Response) => {
    const { name, email, password, classes, subjects } = req.body;
    if (!name || !email || !password || !classes || !subjects) {
        throw new createError.BadRequest("all fields are required");
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const teacher = await Teacher.create({
        ...req.body,
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

                res.status(201).json({ accessToken, refreshToken });
            }
        );
    }
};
