import { Outlet, useNavigate } from "react-router-dom";
import styles from "../../styles/components/dashboard.module.css";
import { Archive, Book, User } from "lucide-react";

const Dashboard = () => {
  const links = [
    {
      id: 1,
      name: "Books",
      path: "/admin/books",
      icon: <Book />,
    },
    {
      id: 2,
      name: "Users",
      path: "/admin/users",
      icon: <User />,
    },
    {
      id: 3,
      name: "Reservations",
      path: "/admin/reservations",
      icon: <Archive />,
    },
  ];

  const goTo = useNavigate()
  const handleRoute = (path: string) => {
    goTo(path)
  }

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <h1>Dashboard</h1>
        <div className={styles.links}>
          {links.map((link) => (
            <div key={link.id} onClick={()=>handleRoute(link.path)} className={styles.link}>
              <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                <p style={{marginTop: "2px", fontWeight: "bold", fontSize: "1.2rem"}} >Module</p>
                {link.icon}
              </div>
              <p>{link.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
