import express from "express";
import dotenv from "dotenv";
import teacher from "./routes/teacher";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use("/", teacher);

app.listen(PORT, () => console.log(`server listening at port${PORT} `));
