import mongoose from "mongoose";

export const connection = mongoose.connect("mongodb://root:example@localhost:27017/",{
    serverSelectionTimeoutMS: 5000,
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log("Error connecting to database", err);
})
