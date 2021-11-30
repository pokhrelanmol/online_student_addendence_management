import mongoose from "mongoose";
import connectDB from "../connectDB";
import Student from "../models/Student";
import * as dotenv from "dotenv";
dotenv.config();
const data = [
    {
        name: "anmol",
        email: "anmol@gm.com",
        roll_no: "326",
        mobile: 7871,
    },
    {
        name: "anmol",
        email: "anmol@gm.com",
        roll_no: "326",
        mobile: 7871,
    },
];
(async () => {
    try {
        await connectDB();
        const studentsList = await Student.create(data);
        if (studentsList) {
            console.log("students created");
        } else {
            console.log("not created");
        }
    } catch (error) {
        console.log(error);
    }
})();
