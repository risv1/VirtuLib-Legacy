import { useEffect, useState } from "react";
import DetailsTable from "../../components/admin/DetailsTable";

const AdminReservations = () => {

    const columns = ["Id", "BookId", "UserId", "Reserved_At", "Status"];

    const [entries, setEntries] = useState([]);
    const fetchEntries = async () => {
        try{
            const response = await fetch("http://localhost:8000/admin/reservations", {
                method: "GET",
                credentials: "include",
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
            <h1>Admin Reservations</h1>
            <DetailsTable columns={columns} entries={entries} />
        </div>
    );
}

export default AdminReservations;