import { Request, Response } from "express";
import { User } from "../models/users";
import { Book } from "../models/books";

const books: Book[] = [
    {id: "1", title: "Hello1", author: "Author1", genre: "Genre1", published: "20-10-2012" },
    {id: "2", title: "Hello2", author: "Author2", genre: "Genre2", published: "21-10-2013" },
    {id: "3", title: "Hello3", author: "Author3", genre: "Genre3", published: "22-10-2014" },
    {id: "4", title: "Hello4", author: "Author4", genre: "Genre4", published: "23-10-2015" },
    {id: "5", title: "Hello5", author: "Author5", genre: "Genre5", published: "24-10-2016" },
    {id: "6", title: "Hello2", author: "Author2", genre: "Genre2", published: "21-10-2013" },
];

const users: User[] = [
    {id: "1", name: "User1", email: "user1@example.com", password: "123", role: "admin"},
    {id: "2", name: "User2", email: "user2@example.com", password: "456", role: "user"},
    {id: "3", name: "User3", email: "user3@example.com", password: "789", role: "user"},
    {id: "4", name: "User4", email: "user4@example.com", password: "012", role: "admin"},
    {id: "5", name: "User5", email: "user5@example.com", password: "345", role: "user"},
];

export const fetchUsers = (req: Request, res: Response) => {
    const data = users;
    if(!data){
        throw new Error("No users found");
    }

    return res.status(200).json(data);
}

    