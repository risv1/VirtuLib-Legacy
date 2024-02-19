// AuthProvider component

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
  const [session, setSession] = useState<User | null>(null);

  const updateSession = (session: User | null) => {
    setSession(session);
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
          updateSession(null);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getSession();
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
