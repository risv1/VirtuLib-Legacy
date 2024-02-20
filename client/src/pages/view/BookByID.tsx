import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "../../models/books";
import { X } from "lucide-react";
import styles from "../../styles/pages/books.module.css";

const BookByID = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await fetch(`http://localhost:8000/books/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setBook(data);
        } else {
          const error = await res.json();
          throw Error(error.message);
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    };
    getBook();
  }, []);

  const handleBack = () => {
    navigate("/books")
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <div onClick={handleBack} style={{marginLeft: "auto"}}><X color="#00d0b5" /></div>
        {book ? (
          <div className={styles.desc}>
            <img
              src="https://www.jkrowling.com/wp-content/uploads/2016/11/HPTSS-1.png"
              alt="Image"
            />
            <div>
              <p className={styles.detail}>
                Title: <span>{book.title}</span>
              </p>
              <p className={styles.detail}>
                Author: <span>{book.author}</span>
              </p>
              <p className={styles.detail}>
                Published: <span>{book.published}</span>
              </p>
              <p className={styles.detail}>
                Description: <span>{book.description}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.desc}>
            <p>Book not found! Retry</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookByID;
