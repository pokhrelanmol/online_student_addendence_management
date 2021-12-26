import { rejects } from "assert";
import axios from "axios";
import jwt from "jsonwebtoken";
export interface IPayload {
    role: string;
    aud: string;
    name: string;
}
export const joinClasses = (...classes: string[]) => {
    return classes.join(" ");
};
interface ITokens {
    accessToken: string;
    refreshToken: string;
}
export const setTokens = (tokens: ITokens) => {
    localStorage.setItem("tokens", JSON.stringify(tokens));
    return;
};

export const sendAccessToken = async (endPoint: string) => {
    return new Promise(async (resolve, reject) => {
        const tokens: any = JSON.parse(localStorage.getItem("tokens"));
        if (!tokens) reject();
        try {
            const res = await axios.get(endPoint, {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            });
            const payload: IPayload = jwt.decode(tokens.accessToken);
            resolve(payload);
        } catch (err) {
            console.log(err.response);
            if (err.response.data.error.message === "jwt expired") {
                const generateRefreshToken = async () => {
                    const tokens: any = JSON.parse(
                        localStorage.getItem("tokens")
                    );
                    if (!tokens) reject();
                    try {
                        const res = await axios.post(
                            "http://localhost:3001/api/auth/refreshToken",
                            { refreshToken: tokens.refreshToken }
                        );
                        const _tokens = {
                            accessToken: res.data.accessToken as string,
                            refreshToken: res.data.refreshToken as string,
                        };
                        setTokens(_tokens);
                        const payload: IPayload = jwt.decode(
                            tokens.accessToken
                        );
                        resolve(payload);
                    } catch (error) {
                        console.log(error.response);
                    }
                };
                generateRefreshToken();
            }
        }
    });
};
