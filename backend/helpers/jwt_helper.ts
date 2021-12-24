import jwt from "jsonwebtoken";

import createError from "http-errors";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import client from "./init_redis";
export const signAccessToken = (userId: string, role: string, name: string) => {
    return new Promise<string>((resolve, reject) => {
        const payload = { aud: userId, role, name };
        const secret = process.env.ACCESS_TOKEN_SECRET as string;
        const options = {
            expiresIn: "1d",
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err);
                reject(
                    new createError.InternalServerError("internal server error")
                );
            }
            resolve(token as string);
        });
    });
};

export const verifyAccessToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = <string>req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (!token) throw new createError.Unauthorized();
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err, user) => {
            if (err) {
                const message =
                    err.name === "JsonWebTokenError"
                        ? "Unauthorized"
                        : err.message;
                return next(new createError.Unauthorized(message));
            }
            (req as any).user = user;
            next();
        }
    );
};

export const signRefreshToken = (
    userId: string,
    role: string,
    name: string
) => {
    return new Promise<string>((resolve, reject) => {
        const payload = { aud: userId, role, name };
        const secret = process.env.REFRESH_TOKEN_SECRET as string;
        const options = {
            expiresIn: "1y",
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err);
                reject(
                    new createError.InternalServerError("internal server error")
                );
            }

            client
                .SET(userId as string, token as string)
                .then((reply) => resolve(token as string))
                .catch((err) => {
                    console.log("could not sign refresh token");
                    console.log(err.message);
                    reject(new createError.InternalServerError());
                    return;
                });
        });
    });
};

export const verifyRefreshToken = (refreshToken: string) => {
    return new Promise((resolve, reject) => {
        // interface IPayload {
        //     aud: string;
        // }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string,
            (err, payload: any) => {
                if (err) return reject(new createError.Unauthorized());
                const userId = payload.aud;
                console.log(payload);
                client
                    .GET(userId)
                    .then((result) => {
                        if (refreshToken === result) {
                            resolve(userId);
                        }
                        reject(
                            new createError.BadRequest("tempered with token")
                        );
                    })
                    .catch((err) => {
                        console.log(err.message);
                        reject(new createError.Unauthorized());
                    });
            }
        );
    });
};
