import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../models/users";

interface AuthContextProps {
  session: User | null;
  updateSession: (session: User | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  updateSession: () => {},
});

export const AuthProvider = (props: { children: JSX.Element }) => {
  const [session, setSession] = useState<User | null>(() => {
    const storedSession = localStorage.getItem("user");
    return storedSession ? JSON.parse(storedSession) : null;
  });

  const updateSession = (session: User | null) => {
    setSession(session);
    if (session) {
      localStorage.setItem("user", JSON.stringify(session));
    } else {
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await fetch("http://localhost:8000/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Session found:", data);
          updateSession(data);
        } else {
          console.log("No session found");
          localStorage.removeItem("session");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (session) {
      getSession();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ session, updateSession }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};