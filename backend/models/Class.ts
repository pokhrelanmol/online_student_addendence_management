import mongoose from "mongoose";
export interface IClass {
    name: string;
    id?: number;
}
const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
export default mongoose.models.Class || mongoose.model("class", ClassSchema);
