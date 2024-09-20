import TodoModel from "../models/Todo.js"

export const addTodo = async (req, res) => {
  const { todoName } = req.body
  const user = req.user
  try {
    const newTodo = new TodoModel({
      todoName,
      completed: false,
      user: user._id
    })

    if (newTodo) {
      await newTodo.save()
      user.todoList.push(newTodo._id)
      await user.save()
      return res.status(200).json({ message: "success", newTodo })
    }

    return res.status(400).json({ message: "Error! Please try again" })
  } catch (error) {
    console.log("Error in todoController/addTodo", error)
    throw new Error(Error)
  }
}

export const removeTodo = async (req, res) => {
  try {
    const { todoId } = req.body;
    const user = req.user

    const deletedTodo = await TodoModel.findByIdAndDelete(todoId)

    user.todoList.pull(todoId)
    user.save()
    return res.status(200).json({ message: "Remove todo successfully", deletedTodo })
  } catch (error) {
    console.log("Error in todoController/removeTodo", error)
    throw new Error(error)
  }
}

export const removeTodoList = async (req, res) => {
  try {
    const user = req.user
    await TodoModel.deleteMany({ userId: user._id })
    user.todoList.splice(0, user.todoList.length)
    user.save()

    return res.status(200).json({ error: false, message: "successfully" })

  } catch (error) {
    console.log("Error in todoController/removeTodoList", error)
    throw new Error(error)
  }
}

export const updateTodoName = async (req, res) => {
  try {
    const { todoId } = req.body;
    const { todoName } = req.body

    const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, { todoName }, { new: true })

    if (!updatedTodo) return
    await updatedTodo.save()
    return res.status(200).json({ error: false, message: "Update todo successfully", updatedTodo })
  } catch (error) {
    console.log("Error in todoController/updateTodo", error)
    throw new Error(error)
  }
}

export const updateTodoStatus = async (req, res) => {
  try {
    const { todoId, completed } = req.body;

    const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, { completed }, { new: true })
    if (!updatedTodo) return res.status(400).json({ error: true, messsage: "Fail in update status" })
    await updatedTodo.save()
    return res.status(200).json({ error: false, message: "Updated status successfully", updatedTodo })
  } catch (error) {
    console.log("Error in todoController/updateTodoStatus", error)
    throw new Error(error)
  }
}

export const getAllTodos = async (req, res) => {
  const user = req.user
  try {
    const todoList = await TodoModel.find({ user: user._id })

    if (!todoList) return res.status(400).json({ error: true, message: "Invalid data" })

    return res.status(200).json({ error: false, message: "Get Todo list successfully", todoList: todoList })

  } catch (error) {
    console.log("Error in todoController/getAllTodos", error)
    throw new Error(error)
  }
}

export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user })
  } catch (error) {
    throw new Error(error)
  }
}
