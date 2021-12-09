import mongoose from "mongoose";
interface Student {
    takeAttendence: boolean;
    name: { type: string; min: 3 };
    email: string;
    roll_no: string;
    mobile: number;
    class: string;
    teacher: string | any;
}
const StudentSchema = new mongoose.Schema<Student>(
    {
        takeAttendence: { type: Boolean, default: false },
        name: {
            type: String,
            required: true,
            minlength: [3, "name should be atleast 3 characters"],
        },
        email: { type: String, required: true },
        roll_no: { type: String, required: true },
        mobile: { type: Number },
        class: {
            type: String,
            enum: {
                values: ["Nursery", "LKG", "UKG", "ONE", "TWO"],
                message: "could not add the {VALUE}",
            },
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
        },
    },
    { timestamps: true }
);
export default mongoose.models.Student ||
    mongoose.model("Student", StudentSchema);
