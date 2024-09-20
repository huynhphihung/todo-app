import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"

import TodoRouter from "./router/TodoRouter.js"
import AuthRouter from "./router/authRouter.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const URI = process.env.DB_URI || ""

const __dirname = path.resolve()

app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(bodyParser.urlencoded({extended: true, limit: "30mb"}))
app.use(bodyParser.json({limit: "30mb"}))
app.use(express.json({limit: "30mb"}))
app.use(express.urlencoded({limit: "30mb", extended: true}))

app.use(cookieParser())

//Server Router
app.use("/api/todo", TodoRouter)
app.use("/api/auth", AuthRouter)

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

mongoose.connect(URI).then(() => {
  console.log("Connected to database")
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
})
