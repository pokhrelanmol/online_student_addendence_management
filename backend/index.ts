import express, { Response, Request } from "express";
import dotenv from "dotenv";
require("express-async-errors");
import teacher from "./routes/teacher";
import notFoundMiddleware from "./middlewares/not-found";
import errorMiddleware from "./middlewares/error-handler";
import connectDB from "./connectDB";

import Student from "./models/Student";
import cron from "node-cron";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;
dotenv.config();

app.get("/", (req: Request, res: Response) => {
    res.send("home page");
});

// routes
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
