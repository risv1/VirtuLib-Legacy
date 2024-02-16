import { Request, Response } from "express";
import { User } from "../models/users";
import { Book, BookModel } from "../models/books";
import { ReservationModel } from "../models/reservations";

export const fetchUsers = (req: Request, res: Response) => {
  const data = users;
  if (!data) {
    throw new Error("No users found");
  }

  return res.status(200).json(data);
};

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

const users: User[] = [
  {
    id: "1",
    name: "User1",
    email: "user1@example.com",
    password: "123",
    role: "admin",
  },
  {
    id: "2",
    name: "User2",
    email: "user2@example.com",
    password: "456",
    role: "user",
  },
  {
    id: "3",
    name: "User3",
    email: "user3@example.com",
    password: "789",
    role: "user",
  },
  {
    id: "4",
    name: "User4",
    email: "user4@example.com",
    password: "012",
    role: "admin",
  },
  {
    id: "5",
    name: "User5",
    email: "user5@example.com",
    password: "345",
    role: "user",
  },
];