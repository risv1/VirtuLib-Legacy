import { Request, Response } from "express";
import { UserModel } from "../models/users";
import { Book, BookModel } from "../models/books";
import { ReservationModel } from "../models/reservations";

export const fetchUsers = async (req: Request, res: Response) => {
  const data = await UserModel.find();
  if (!data) {
    throw new Error("No users found");
  }

  return res.status(200).json(data);
};

export const fetchUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const data = await UserModel.findOne({ id: id });
    if (!data) {
      return res.status(404).json({ error: "No user found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { src, title, author, genre, description, published } = req.body;
    const book: Book = {
      id: Math.random()
        .toString(36)
        .substring(2, 2 + 10),
      src: src,
      title: title,
      author: author,
      genre: genre,
      description: description,
      published: published,
      reserved: "returned",
    };
    const newBook = new BookModel(book);
    await newBook
      .save()
      .then((book) => {
        console.log("Book created:", book);
      })
      .catch((err) => {
        console.log(err);
      });

    return res.status(201).json({ message: "Created book", book: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ error: "Failed to create book" });
  }
};

export const setReturnedBook = (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    BookModel.findOneAndUpdate({ id: id }, { reserved: "returned" })
      .then(async (book) => {
        if (!book) {
          return res.status(404).json({ error: "Book not found" });
        }

        const nextReservation = await ReservationModel.findOne({
          bookid: id,
        }).sort({ reserved_at: 1 });
        if (nextReservation) {
          const userEmail = nextReservation.userid;
          const message = `The book '${book.title}' you reserved is now available.`;
          console.log(`Email sent to ${userEmail}: ${message}`);
        }

        return res.status(200).json({ message: "Book returned" });
      })
      .catch((err) => {
        console.error("Error returning book:", err);
        return res.status(500).json({ error: "Failed to return book" });
      });
  } catch (err) {
    console.error("Error returning book:", err);
    return res.status(500).json({ error: "Failed to return book" });
  }
};

export const setActiveBook = (req: Request, res: Response) => {
  const id = req.params.id;
  BookModel.findOneAndUpdate({ id: id }, { reserved: "active" })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      return res.status(200).json({ message: "Book set active" });
    })
    .catch((err) => {
      console.error("Error setting book active:", err);
      return res.status(500).json({ error: "Failed to set book active" });
    });
};
