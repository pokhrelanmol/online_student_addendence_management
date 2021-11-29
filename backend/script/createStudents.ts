import mongoose from "mongoose";
import connectDB from "../connectDB";
import StudentShema from "../models/Students";
import * as dotenv from "dotenv";
dotenv.config();
(async () => {
    try {
        await connectDB(process.env.MONGO_URI),
            function () {
                console.log("db connected");
            };

        await StudentShema.create({
            name: "anmol",
            email: "anmol@gm.com",
            roll_no: "0326",
            mobile: "7871",
        });
    } catch (error) {
        console.log("cannot run the script");
    }
})();
