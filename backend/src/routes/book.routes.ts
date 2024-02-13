import express from "express"
import { fetchBook, fetchBooks, fetchGenre } from "../handlers/books";

const bookRouter = express.Router()

bookRouter.get("/books", fetchBooks)
bookRouter.get("/books/:id", fetchBook)
bookRouter.get("/books/genre/:genre", fetchGenre) 

export default bookRouter;