import mongoose from "mongoose";

export type Book = {
    id: string;
    title: string;
    author: string;
    genre: string;
    published: string;
    reserved: "reserved" | "active" | "returned";
}

const BookSchema = new mongoose.Schema<Book>({
    id: {
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
        required: true,
    }
})

export const BookModel = mongoose.model<Book>("Book", BookSchema);