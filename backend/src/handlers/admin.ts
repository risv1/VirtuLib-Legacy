import { Request, Response } from "express";
import { UserModel } from "../models/users";
import { Book, BookModel } from "../models/books";

export const fetchUsers = async(req: Request, res: Response) => {
  const data = await UserModel.find();
    if(!data){
        throw new Error("No users found");
    }

    return res.status(200).json(data);
};

export const fetchUser = async(req: Request, res: Response) => {
  const id = req.params.id
  try {
      const data = await UserModel.findOne({ id: id });
      if(!data){
          return res.status(404).json({ error: "No user found" });
      }
      return res.status(200).json(data);
  } catch (error) {
      return res.status(500).json({ error: error });
  }
}


export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, published } = req.body;
    const book: Book = {
      id: Math.random().toString(36).substring(2, 2 + 10),
      title: title,
      author: author,
      genre: genre,
      published: published,
      reserved: "returned",
    };
    const newBook = new BookModel(book);
    await newBook.save().then((book) => {
      console.log("Book created:", book);
    }).catch((err) => {
        console.log(err)
    });

    return res.status(201).json({ message: "Created book", book: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ error: "Failed to create book" });
  }
};
