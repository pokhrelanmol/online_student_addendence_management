import express, { Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
require("express-async-errors");
import notFoundMiddleware from "./middlewares/not-found";
import errorMiddleware from "./middlewares/error-handler";
import connectDB from "./connectDB";

import cron from "node-cron";
// CONTROLLERS
import registration from "./routes/register";
import login from "./routes/login";
import teacher from "./routes/teacher";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;
dotenv.config();

app.get("/", (req: Request, res: Response) => {
    res.send("home page");
});

// routes
app.use("/", registration);
app.use("/", login);
app.use("/", teacher);
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
