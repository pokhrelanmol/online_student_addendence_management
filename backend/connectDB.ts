import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDB = async (): Promise<void> => {
    console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI as string, () =>
        console.log("db connected")
    );
};
export default connectDB;
