import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/pages/user.module.css";
import { useAuth } from "../../layouts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {session, updateSession} = useAuth();

  useEffect(() => {
    if(session){
      navigate("/profile")
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.user);
        updateSession(data.user);
        navigate("/profile");
      } else {
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.hold}>
        <h1>Login</h1>
        <form className={styles.hold} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}>
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
