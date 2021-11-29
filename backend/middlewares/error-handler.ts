import express, {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction,
} from "express";

const errorHandlerMiddleware = async (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    return res
        .status(500)
        .json({ msg: "Something went wrong, please try again" });
};
export default errorHandlerMiddleware;
