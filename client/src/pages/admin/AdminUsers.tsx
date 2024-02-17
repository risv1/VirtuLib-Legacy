import { useEffect, useState } from "react";
import DetailsTable from "../../components/admin/DetailsTable";

const AdminUsers = () => {

    const columns = ["Id", "Name", "Email", "Password", "Role"];

    const [entries, setEntries] = useState([]);
    const fetchEntries = async () => {
        try{
            const response = await fetch("http://localhost:8000/admin/users", {
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
            <h1>Admin Users</h1>
            <DetailsTable columns={columns} entries={entries} />
        </div>
    );
}

export default AdminUsers;