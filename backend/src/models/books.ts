import mongoose from "mongoose";

export type Book = {
    id: string;
    src: string;
    title: string;
    author: string;
    description: string;
    genre: string;
    published: string;
    reserved: "active" | "returned";
}

const BookSchema = new mongoose.Schema<Book>({
    id: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    published: {
        type: String,
        required: true,
    },
    reserved: {
        type: String,
        enum: ["reserved", "active", "returned"],
        required: true,
    },
});

export const BookModel = mongoose.model<Book>("Book", BookSchema);