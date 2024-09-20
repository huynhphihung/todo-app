/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import TodoApp from "../components/TodoApp";
import ProtectedRoute from "./ProtectedRoute";

const AuthLayout = () => {
  return <Outlet />
}

export default createBrowserRouter([{
  element: <AuthLayout />,
  children: [
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/",
      element:  (
        <ProtectedRoute>
          <TodoApp />
        </ProtectedRoute>
      ) 
    }
  ]
}])
