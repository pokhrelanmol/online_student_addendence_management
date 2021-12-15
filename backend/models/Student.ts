import mongoose from "mongoose";
import Subject from "./Subject";
import Teacher, { TeacherType } from "./Teacher";
interface StudentType extends TeacherType {
    rollNumber: number;
    class: string;
    isRegistered: boolean;
    teachers: mongoose.Schema.Types.ObjectId[];
}

const StudentSchema = new mongoose.Schema<StudentType>({
    name: {
        type: String,
        required: true,
        minlength: [3, "name should be of more then 3 characters"],
    },
    email: { type: String, unique: true },
    rollNumber: { type: Number, required: true },
    class: { type: String, required: true },
    subjects: [String],
    password: { type: String, minlength: 6 },
    // teacher field should use the id of creator
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: Teacher }],
    isRegistered: Boolean,
});

export default mongoose.models.Student ||
    mongoose.model("student", StudentSchema);
