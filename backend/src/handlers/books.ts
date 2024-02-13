import { Request, Response } from "express";
import { Book } from "../models/books";

const books: Book[] = [
    {id: "1", title: "Hello1", author: "Author1", genre: "Genre1", published: "20-10-2012" },
    {id: "2", title: "Hello2", author: "Author2", genre: "Genre2", published: "21-10-2013" },
    {id: "3", title: "Hello3", author: "Author3", genre: "Genre3", published: "22-10-2014" },
    {id: "4", title: "Hello4", author: "Author4", genre: "Genre4", published: "23-10-2015" },
    {id: "5", title: "Hello5", author: "Author5", genre: "Genre5", published: "24-10-2016" },
    {id: "6", title: "Hello2", author: "Author2", genre: "Genre2", published: "21-10-2013" },
];

export const fetchBooks = (req: Request, res: Response) => {
    const data = books;
    if(!data){
        throw new Error("No books found");
    }

    return res.status(200).json(data);
}

export const fetchBook = (req: Request, res: Response) => {
    const id = req.params.id;
    const data = books.find(book => book.id === id);
    if(!data){
        throw new Error("No book found");
    }

    return res.status(200).json(data);
}

export const fetchGenre = (req: Request, res: Response) => {
    const genre = req.params.genre;
    const data = books.filter(book => book.genre.toLowerCase() === genre);
    if(!data){
        throw new Error("No books found");
    }
    
    return res.status(200).json(data);
}
