import mongoose from "mongoose";
const StudentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "student name should me of more then 3 characters"],
    },
    email: { type: String, required: true, unique: true },
    roll_no: { type: String, required: true },
});
export default mongoose.models.registeredStudent ||
    mongoose.model("registeredStudent", StudentsSchema);
