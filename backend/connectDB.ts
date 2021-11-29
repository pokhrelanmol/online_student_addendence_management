import mongoose from "mongoose";

const connectDB = (url: any) => {
    return mongoose.connect(url, () => console.log("db connected"));
};
export default connectDB;
