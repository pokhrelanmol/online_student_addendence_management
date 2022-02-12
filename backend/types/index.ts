import { Request } from "express";
import { VerifyErrors, VerifyOptions } from "jsonwebtoken";
export interface User {
    aud: string;
    role: string;
    name: string;
    iat: number;
    exp: number;
}
export interface Req extends Request {
    user: User;
}
