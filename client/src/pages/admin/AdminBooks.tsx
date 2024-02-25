import { useEffect, useState } from "react";
import DetailsTable from "../../components/admin/DetailsTable";
import { Book } from "../../models/books";
import { Outlet, useNavigate } from "react-router";
import { useModal } from "../../layouts/ModalContext";
import styles from "../../styles/pages/admin.module.css";

const AdminBooks = () => {
  const columns = ["Id", "Title", "Author", "Genre", "Published", "Reserved"];

  const [entries, setEntries] = useState<Book[]>([]);
  const fetchEntries = async () => {
    try {
      const response = await fetch("http://localhost:8000/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setEntries(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const navigate = useNavigate();
  const { onOpen } = useModal();

  const handleRoute = () => {
    onOpen();
    navigate("new");
  };

  return (
    <>
      <div>
        <div className={styles.head}>
          <h1>Admin Books</h1>
          <button className={styles.button} onClick={handleRoute}>
            Add New Book
          </button>
        </div>
        <DetailsTable columns={columns} entries={entries} />
      </div>
      <Outlet />
    </>
  );
};

export default AdminBooks;
