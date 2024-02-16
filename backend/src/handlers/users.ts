import { Request, Response } from "express";

export const fetchUserBooks = (req: Request, res: Response) => {
    return res.json({message: "User's books"});
}
