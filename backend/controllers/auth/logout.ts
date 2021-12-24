import { Request, Response } from "express";
import createError from "http-errors";
import client from "../../helpers/init_redis";
import { verifyRefreshToken } from "../../helpers/jwt_helper";
const logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    client
        .DEL(userId as string)
        .then((result) => {
            console.log("logged out" + result);
            res.status(204).json({ message: "user Log out successfull" });
        })
        .catch((err) => {
            throw new createError.InternalServerError("Unable to log you out");
        });
};
export default logout;
