import mongoose from "mongoose";
import Subject from "./Subject";
import Teacher, { ITeacher } from "./Teacher";
export interface IStudent extends ITeacher {
    rollNumber: number;
    class: string;
    isRegistered: boolean;
    subjects: mongoose.Schema.Types.ObjectId[];
    teachers: mongoose.Schema.Types.ObjectId[];
    isAttendenceOpen: Boolean;
}

const StudentSchema = new mongoose.Schema<IStudent>({
    name: {
        type: String,
        required: true,
        minlength: [3, "name should be of more then 3 characters"],
    },
    email: { type: String, unique: true },
    rollNumber: { type: Number, required: true },
    class: { type: String, required: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: Subject }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: Teacher }],
    password: { type: String, minlength: 6 },
    isRegistered: Boolean,
    isAttendenceOpen: Boolean,
});

export default mongoose.models.Student ||
    mongoose.model("student", StudentSchema);
