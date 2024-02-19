import { Outlet } from "react-router-dom";
import NotAuthNavbar from "./components/nav/NotAuthNavbar";
import { useAuth } from "./layouts/AuthContext";
import { useEffect, useState } from "react";
import AuthNavbar from "./components/nav/AuthNavbar";

const App = () => {
  const { session } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
      if (session.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, [session]);

  return (
    <>
      {isLoggedIn ? <AuthNavbar isAdmin={isAdmin} /> : <NotAuthNavbar />}
      <Outlet />
    </>
  );
};

export default App;
