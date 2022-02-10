import mongoose from "mongoose";
import Class from "./Class";
import Student from "./Student";
import Subject from "./Subject";
const AttendenceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: Student },
    class: { type: mongoose.Schema.Types.ObjectId, ref: Class },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: Subject },
    teacher: mongoose.Schema.Types.ObjectId,
    attendenceCount: Number,
});
export default mongoose.models.Attendence ||
    mongoose.model("attendence", AttendenceSchema);
