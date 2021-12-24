import { Request, Response, NextFunction } from "express";
interface ErrorRequestHandler {
    status?: number;
    message?: string;
    code?: number;
}
const errorHandlerMiddleware = async (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    if (err.code === 11000) {
        err.status = 409;
        err.message = "user Already Exists";
    }
    return res.status(err.status || 500).json({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
};

export default errorHandlerMiddleware;
