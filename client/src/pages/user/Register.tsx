import { useNavigate } from "react-router-dom";
import styles from "../../styles/pages/user.module.css"
import { useState } from "react";

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:8000/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.headers.get("Content-Type")?.includes("application/json")) {
            const data = await response.json();
            if (response.ok) {
              console.log(data);
              navigate("/login");
            } else {
              console.log(data.message);
            }
          } else {
            console.log("Received non-JSON response");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

    return(
        <div className={styles.container}>
      <div className={styles.hold}>
        <h1>Register</h1>
        <form className={styles.hold} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}>
            <label>Name</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
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
    )
}

export default Register;