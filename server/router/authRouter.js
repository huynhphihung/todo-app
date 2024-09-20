import express from "express"
import { getUser, login, logout, signup } from "../controllers/auth.controller.js"
import { checkAuth } from "../controllers/todo.controller.js"
import { protectedRoute } from "../middleware/protectedRoute.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/getUser", getUser)

router.get("/check-auth", protectedRoute, checkAuth)

export default router
