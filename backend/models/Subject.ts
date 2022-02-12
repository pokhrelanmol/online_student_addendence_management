import mongoose from "mongoose";
export interface ISubject {
    name: string;
    id?: string;
}
const Subject = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
export default mongoose.models.Subject || mongoose.model("subject", Subject);
