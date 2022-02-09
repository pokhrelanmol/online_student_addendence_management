import mongoose from "mongoose";
const AttendenceSchema = new mongoose.Schema({
    student: mongoose.Schema.Types.ObjectId,
    class: mongoose.Schema.Types.ObjectId,
    subject: mongoose.Schema.Types.ObjectId,
    teacher: mongoose.Schema.Types.ObjectId,
    attendenceCount: Number,
});
export default mongoose.models.Attendence ||
    mongoose.model("attendence", AttendenceSchema);
