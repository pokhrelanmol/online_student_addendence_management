import express, { Response, Request } from "express";
import dotenv from "dotenv";
require("express-async-errors");
import teacher from "./routes/teacher";
import notFoundMiddleware from "./middlewares/not-found";
import errorMiddleware from "./middlewares/error-handler";
import connectDB from "./connectDB";

dotenv.config();
const app = express();
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

app.listen(PORT, async () => {
    console.log(` server running on port ${PORT}`);
    await connectDB();
});
