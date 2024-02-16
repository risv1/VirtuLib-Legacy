import mongoose from "mongoose";

export const connection = mongoose.connect("mongodb://127.0.0.1:27017/vb",{
    serverSelectionTimeoutMS: 5000,
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log("Error connecting to database", err);
})