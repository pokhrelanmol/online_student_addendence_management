import express from "express";
import dotenv from "dotenv";
require("express-async-errors");
import teacher from "./routes/teacher";

import notFoundMiddleware from "./middlewares/not-found";
import errorMiddleware from "./middlewares/error-handler";
import connectDB from "./connectDB";
dotenv.config();
const app = express();
// middleware
const PORT = process.env.PORT || 4000;
app.use("/", teacher);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(` server running on port ${PORT}`);
    await connectDB(process.env.MONGO_URI);
});
