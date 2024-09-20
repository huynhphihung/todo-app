import express from "express"
import { addTodo, getAllTodos, removeTodo, removeTodoList, updateTodoName, updateTodoStatus } from "../controllers/todo.controller.js"
import { protectedRoute } from "../middleware/protectedRoute.js"

const router = express.Router()

router.post("/add-todo", protectedRoute, addTodo)
router.post("/remove-todo",protectedRoute, removeTodo)
router.post("/remove-todo-list", protectedRoute, removeTodoList)
router.post("/update-todo-name",protectedRoute, updateTodoName)
router.post("/update-todo-status", protectedRoute, updateTodoStatus)

router.get("/get-all-todos", protectedRoute, getAllTodos)

export default router
