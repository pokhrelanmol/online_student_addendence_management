import express, {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction,
} from "express";

const errorHandlerMiddleware = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.code === 11000) {
        return res
            .status(500)
            .json({ msg: "email you entered is already in use" });
    }
    return res
        .status(500)
        .json({ msg: "Something went wrong, please try again" });
};
export default errorHandlerMiddleware;
