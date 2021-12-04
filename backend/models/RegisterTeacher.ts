import mongoose from "mongoose";
const TeachersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "teacher name should me of more then 3 characters"],
    },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        minlength: [6, "min length of password is 6"],
    },
});
export default mongoose.models.registeredTeacher ||
    mongoose.model("registeredTeacher", TeachersSchema);
