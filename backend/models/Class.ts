import mongoose from "mongoose";
const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
export default mongoose.models.Class || mongoose.model("class", ClassSchema);
