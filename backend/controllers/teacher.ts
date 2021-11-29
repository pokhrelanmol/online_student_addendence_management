import express, { Request, Response } from "express";
export const teacher = (req: Request, res: Response) => {
    res.json({ message: "serving working" });
};
