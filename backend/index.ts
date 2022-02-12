import express, { Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
require("express-async-errors");
import notFoundMiddleware from "./middlewares/not-found";
import errorMiddleware from "./middlewares/error-handler";
import connectDB from "./connectDB";

import cron from "node-cron";
// CONTROLLERS
import registration from "./routes/auth/register";
import login from "./routes/auth/login";
import teacher from "./routes/teacher";
import attendence from "./routes/attendence";
import refreshToken from "./routes/auth/refreshToken";
import logout from "./routes/auth/logout";
import { verifyAccessToken } from "./helpers/jwt_helper";
import Teacher from "./models/Teacher";
import createError from "http-errors";
import Student from "./models/Student";
// types
import { Req } from "./types/index";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;
dotenv.config();

app.get(
    "/api",
    verifyAccessToken,
    async (req: Req | any | any, res: Response) => {
        if (req.user.role === "teacher") {
            const teacher = await Teacher.findOne({
                _id: req.user.aud as string,
            });
            if (!teacher) throw new createError.NotFound();
            res.json({ user: teacher });
        } else if (req.user.role === "student") {
            const student = await Student.findOne({
                _id: req.user.aud as string,
            });
            if (!student) throw new createError.NotFound();
            res.json({ user: student });
        }
    }
);

// routes
app.use("/api/auth", registration);
app.use("/api/auth", login);
app.use("/api/auth", refreshToken);
app.use("/api/auth", logout);
app.use("/api", teacher);
app.use("/api", attendence);
// middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);
cron.schedule(" 59 23 * * *", () => {
    console.log("will execute every day until stopped");
});
app.listen(PORT, async () => {
    console.log(` server running on port ${PORT}`);
    await connectDB();
});
