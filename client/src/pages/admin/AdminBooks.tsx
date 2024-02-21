import { useEffect, useState } from "react";
import DetailsTable from "../../components/admin/DetailsTable";
import { Book } from "../../models/books";
import { Outlet, useNavigate } from "react-router";

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

  const navigate = useNavigate()

  return (
    <>
      <div>
        <h1>Admin Books</h1> 
        <button onClick={()=>navigate("new")}>Add New Book</button>
        <DetailsTable columns={columns} entries={entries} />
      </div>
      <Outlet />
    </>
  );
};

export default AdminBooks;
