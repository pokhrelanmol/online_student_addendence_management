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
    console.log(err);
    if (err.code === 11000) {
        return res
            .status(400)
            .json({ error: "email you entered is already in use" });
    }
    return res
        .status(500)
        .json({ error: "Something went wrong, please try again" });
};
export default errorHandlerMiddleware;
