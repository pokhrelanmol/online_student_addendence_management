import express, { Request, Response, NextFunction } from "express";
export const authTeacher = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.json({});
};
export const authStudent = (
    req: Request,
    res: Response,
    next: NextFunction
) => {};
