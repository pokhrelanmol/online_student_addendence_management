import mongoose from "mongoose";
import Class, { IClass } from "./Class";
import Subject, { ISubject } from "./Subject";

export interface ITeacher {
    name: string;
    email: string;
    classes: IClass[];
    subject: { name: string; subject: string };
    password: string;
    id?: string;
}

const TeacherSchema = new mongoose.Schema<ITeacher>({
    name: {
        type: String,
        required: true,
        minlength: [3, "name should be of more then 3 characters"],
    },
    email: { type: String, unique: true },
    classes: [{ type: mongoose.Types.ObjectId, ref: Class }],
    subject: { type: mongoose.Schema.Types.ObjectId, ref: Subject },
    password: { type: String, minlength: 6 },
});

export default mongoose.models.Teacher ||
    mongoose.model("teacher", TeacherSchema);
