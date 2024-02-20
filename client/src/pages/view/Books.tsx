import BooksContainer from "../../components/books/BooksContainer";
import styles from "../../styles/pages/books.module.css";

const Books = () => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <h1>View Books</h1>
        </div>
        <BooksContainer />
      </div>
    </div>
  );
};

export default Books;
