import { Book } from "lucide-react";
import styles from "../../styles/components/book_details.module.css";
import { useNavigate } from "react-router";

const ViewBook = (props: {
  id: string;
  title: string;
  author: string;
  genre: string;
  published: string;
}) => {

  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate(props.id)
  }

  return (
    <div className={styles.book}>
      <img src="https://www.jkrowling.com/wp-content/uploads/2016/11/HPTSS-1.png" alt="Image" width={200} height={300} />
      <p>
        Title: <span className={styles.detail}>{props.title}</span>
      </p>
      <p>
        Author: <span className={styles.detail}>{props.author}</span>
      </p>
      <p>
        Genre: <span className={styles.detail}>{props.genre}</span>
      </p>
      <p>
        Published: <span className={styles.detail}>{props.published}</span>
      </p>
      <button onClick={handleSubmit} className={styles.button}>View<Book /></button>
    </div>
  );
};

export default ViewBook;
