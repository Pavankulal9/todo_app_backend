import mongoose from "mongoose";
import { DB_NAME } from "../content.js";

const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`Connected to MONGODB on HOST:${connection.connection.host}`);
    } catch (error) {
        console.log("MONGODB Connection faild ",error.message);
        process.exit(1);
    }
    
}

export default connectDB;