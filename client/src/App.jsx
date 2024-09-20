import {Routes, Route, useNavigate, Navigate, RouterProvider} from "react-router-dom"

import "./App.css"
import router from "./routes/index"

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
