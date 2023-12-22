import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectToDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log("Connected to database successfullyy !!")
    } catch (err) {
        console.log("MONGO CONNECTION FAILED", err.message);
        process.exit(1);
    }
}

export default connectToDB