import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const dbUri = process.env.DB_URI!;

export const connection = mongoose.connect(dbUri,{
    serverSelectionTimeoutMS: 5000,
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log("Error connecting to database", err);
})