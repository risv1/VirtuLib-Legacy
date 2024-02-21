import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/globals.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Admin from "./pages/admin/Admin.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminReservations from "./pages/admin/AdminReservations.tsx";
import AdminBooks from "./pages/admin/AdminBooks.tsx";
import Login from "./pages/user/Login.tsx";
import Register from "./pages/user/Register.tsx";
import Profile from "./pages/user/Profile.tsx";
import { AuthProvider } from "./layouts/AuthContext.tsx";
import BaseDash from "./components/admin/BaseDash.tsx";
import Books from "./pages/view/Books.tsx";
import BookByID from "./pages/view/BookByID.tsx";
import AdminNewBook from "./pages/admin/AdminNewBook.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/books",
        element: <Books />
      },
      {
        path: "/books/:id",
        element: <BookByID />
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {index: true, element: <BaseDash />},
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            path: "reservations",
            element: <AdminReservations />,
          },
          {
            path: "books",
            element: <AdminBooks />,
            children: [
              {path: "new", element: <AdminNewBook />},
            ]
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
