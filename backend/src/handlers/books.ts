import { Request, Response } from "express";
import { BookModel } from "../models/books";

export const fetchBooks = async(req: Request, res: Response) => {
    const data = await BookModel.find();
    if(!data){
        throw new Error("No books found");
    }

    return res.status(200).json(data);
}

export const fetchBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const data = await BookModel.findOne({ id: id });
        if(!data){
            return res.status(404).json({ error: "No book found" });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

export const fetchGenre = async (req: Request, res: Response) => {
    const genre = req.params.genre;
    try {
        const data = await BookModel.find({ genre: genre });
        if(!data){
            return res.status(404).json({ error: "No book found" });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}
