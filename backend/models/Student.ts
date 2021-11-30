import mongoose from "mongoose";
interface Student {
    name: { type: string; min: 3 };
    email: string;
    roll_no: string;
    mobile: number;
    class: mongoose.Schema.Types.ObjectId;
}
const StudentSchema = new mongoose.Schema<Student>({
    name: {
        type: String,
        required: true,
        minlength: [3, "name should be atleast 3 characters"],
    },
    email: { type: String, required: true },
    roll_no: { type: String, required: true },
    mobile: { type: Number },
    class: {
        ref: "Class",
    },
});
export default mongoose.models.Student ||
    mongoose.model("Student", StudentSchema);
