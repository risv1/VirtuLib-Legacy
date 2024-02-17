import { useEffect, useState } from "react";
import DetailsTable from "../../components/admin/DetailsTable";

const AdminBooks = () => {

    const columns = ["Id", "Title", "Author", "Genre", "Published", "Reserved"];

    const [entries, setEntries] = useState([]);
    const fetchEntries = async () => {
        try{
            const response = await fetch("http://localhost:8000/books", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            console.log(data)
            setEntries(data);
        } catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchEntries()
    }, [])


    return (
        <div>
            <h1>Admin Books</h1>
            <DetailsTable columns={columns} entries={entries} />
        </div>
    );
}

export default AdminBooks;