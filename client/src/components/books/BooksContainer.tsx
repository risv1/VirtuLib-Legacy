import { useEffect, useState } from "react";
import { Book } from "../../models/books";
import styles from "../../styles/components/book_details.module.css";
import ViewBook from "./ViewBook";

const BookContainer = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8000/books", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setBooks(data);
        } else {
          const error = await res.json();
          throw Error(error.message);
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [books, search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div style={{marginLeft: "auto", marginRight: "1rem"}}>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={handleChange}
          className={styles.search}
        />
      </div>
      <div className={styles.books_container}>
        {filteredBooks.length>0 ? (filteredBooks.map((book) => (
          <ViewBook
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            published={book.published}
          />
        ))):(
          <div style={{justifySelf: "center"}}>
            <h1>No books found...</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default BookContainer;
