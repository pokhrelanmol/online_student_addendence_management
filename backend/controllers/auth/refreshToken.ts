import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());
import createError from "http-errors";

import {
    signAccessToken,
    verifyRefreshToken,
    signRefreshToken,
} from "../../helpers/jwt_helper";
interface IPayload {
    role: string;
    aud: string;
    name: string;
}
const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new createError.BadRequest();
    const payload = <IPayload>jwt.decode(refreshToken);
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(
        userId as string,
        payload.role,
        payload.name
    );

    const refToken = await signRefreshToken(
        userId as string,
        "teacher",
        payload.name
    );

    res.json({ accessToken, refreshToken: refToken });
};
export default refreshToken;
