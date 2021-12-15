import mongoose from "mongoose";
const Subject = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
export default mongoose.models.Subject || mongoose.model("subject", Subject);
