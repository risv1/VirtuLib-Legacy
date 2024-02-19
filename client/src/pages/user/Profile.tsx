import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/pages/user.module.css";
import { useEffect } from "react";
import { useAuth } from "../../layouts/AuthContext";

const Profile = () => {

  const {session, updateSession} = useAuth()
  const nav = useNavigate()

    useEffect(()=>{
        if(!session){
            nav("/login")
        }
    }, [])

    const handleLogout = async() => {
        try{
            const res = await fetch("http://localhost:8000/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                console.log("Successfully logged out.")
                updateSession(null)
                window.location.reload()
            }
            nav("/login")
        } catch(err){
            console.log(err)
        }
        
    }

  return (
    <div className={styles.container}>
      <div className={styles.hold}>
        <h1>Profile</h1>
        {session ? (
          <div className={styles.details}>
            <div>
              <h2>Username</h2>
              <p>{session.name}</p>
            </div>
            <div>
              <h2>Email</h2>
              <p>{session.email}</p>
            </div>
            <div>
              <Link to={"/"} className={styles.gohome}>Go Home</Link>
              <button onClick={handleLogout} className={styles.signout}>Sign Out</button>
            </div>
          </div>
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
