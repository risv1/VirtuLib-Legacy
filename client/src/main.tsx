import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home.tsx'
import Admin from './pages/admin/Admin.tsx'
import AdminUsers from './pages/admin/AdminUsers.tsx'
import AdminReservations from './pages/admin/AdminReservations.tsx'
import AdminBooks from './pages/admin/AdminBooks.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {index: true, element: <Home />},
      {
        path: "/about",
        element: <h1>About</h1>
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "users",
            element: <AdminUsers />
          },
          {
            path: "reservations",
            element: <AdminReservations />
          },
          {
            path: "books",
            element: <AdminBooks />,
          },
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
