import mongoose from "mongoose";
import Class from "./Class";
import Subject from "./Subject";

export interface TeacherType {
    name: string;
    email: string;
    classes: String[];
    subject: String[];
    password: string;
}

const TeacherSchema = new mongoose.Schema<TeacherType>({
    name: {
        type: String,
        required: true,
        minlength: [3, "name should be of more then 3 characters"],
    },
    email: { type: String, unique: true },
    classes: [{ type: mongoose.Types.ObjectId, ref: Class }],
    subject: mongoose.Schema.Types.ObjectId,
    password: { type: String, minlength: 6 },
});

export default mongoose.models.Teacher ||
    mongoose.model("teacher", TeacherSchema);
