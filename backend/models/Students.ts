import mongoose from "mongoose";
interface Student {
    name: string;
    email: string;
    roll_no: string;
    mobile: number;
}
const StudentSchema = new mongoose.Schema<Student>({
    name: {
        type: String,
        required: true,
        minlength: [3, "name should be atleast 3 characters"],
    },
    email: { type: String, required: true },
    roll_no: { type: String, requires: true },
    mobile: { type: Number },
});
export default mongoose.models.Students ||
    mongoose.model("Student", StudentSchema);
