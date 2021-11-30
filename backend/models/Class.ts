import mongoose from "mongoose";
type ClassName = "Nursery" | "LKG" | "UKG" | "ONE" | "TWO";

interface Class {
    name: { type: ClassName; unique: true };
}
const ClassSchema = new mongoose.Schema<Class>({
    name: {
        type: String,
        unique: true,
        required: true,
    },
});
export default mongoose.models.Class || mongoose.model("Class", ClassSchema);
