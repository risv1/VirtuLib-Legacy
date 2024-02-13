import { Request, Response } from "express";
import { User } from "../models/users";

const users: User[] = [
    {id: "1", name: "User1", email: "user1@example.com", password: "123", role: "admin"},
    {id: "2", name: "User2", email: "user2@example.com", password: "456", role: "user"},
    {id: "3", name: "User3", email: "user3@example.com", password: "789", role: "user"},
    {id: "4", name: "User4", email: "user4@example.com", password: "012", role: "admin"},
    {id: "5", name: "User5", email: "user5@example.com", password: "345", role: "user"},
];

export const fetchUser = (req: Request, res: Response) => {
    const id = req.params.id
    const data = users.find(user => user.id === id);
    if(!data){
        throw new Error("No user found");
    }

    return res.status(200).json(data);
}

export const fetchUserBooks = (req: Request, res: Response) => {
    return res.json({message: "User's books"});
}