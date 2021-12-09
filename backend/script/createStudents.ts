import mongoose from "mongoose";
import connectDB from "../connectDB";
import Student from "../models/Student";
import { dummyStudents } from "../dummyData";
import { config } from "dotenv";
config();
(async () => {
    try {
        await connectDB();
        await Student.deleteMany();
        console.log("deleted");
        // const studentsList = await Student.create(dummyStudents);
        // if (studentsList) {
        //     console.log("students created");
        // } else {
        //     console.log("not created");
        // }
    } catch (error) {
        console.log(error);
    }
})();
