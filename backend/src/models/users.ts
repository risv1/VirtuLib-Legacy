import mongoose from "mongoose";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

const UserSchema = new mongoose.Schema<User>({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
})

export const UserModel = mongoose.model<User>("User", UserSchema);