import { create } from "zustand"
import { serverUrl } from "../variables"


export const useAddTodo = create((set) => ({
  filters: {
    search: "",
    status: "All",
  },
  todoList: [],
  addTodo: async (payload) => {
    try {
      
      const res = await fetch(`/api/todo/add-todo`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({todoName: payload.todoName})
      })

      const data = await res.json()
      set(state => ({
        todoList: [...state.todoList, data.newTodo]
      }))

    } catch (error) {
      console.log(error)
    }
  },
  removeTodo: async (id) => {

    set(state => ({
      todoList: state.todoList.filter(todo => todo.id !== id)
    }))
    const res = await fetch(`/api/todo/remove-todo`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify({todoId: id})
    })

    const data = await res.json()
    set(state => ({
      todoList: state.todoList.filter(todo => todo._id !== data.deletedTodo._id) 
    }))
  },
  updateTodoName: async (id, payload) => {
    const res = await fetch(`/api/todo/update-todo-name`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({todoId: id, todoName: payload})
    })

    const data = await res.json()

    set(state => ({
      todoList: state.todoList.map(todo => todo._id === id ? { ...todo, todoName: data.updatedTodo.todoName } : todo)
    }))
  },
  getTodoList: async () => {
    try {
      const res = await fetch(`/api/todo/get-all-todos`, {
        credentials: "include"
      })

      const data = await res.json()
      set({ todoList: data.todoList })
    } catch (error) {
      console.log("Invalid value", error)
    }
  },
  removeTodoList: async () => {
    set({ todoList: [] })
    try {
     const res = await fetch(`/api/todo/remove-todo-list`, {
        method: "POST",
        credentials: "include",
        
      }) 
    } catch (error) {
     console.log(error) 
    }
  },
  setTodoList: (newItem) => {
    set({ todoList: newItem })
  },
  handleIsCompleted: async (id, isCompleted) => {
    const res = await fetch(`/api/todo/update-todo-status`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({todoId: id, completed: !isCompleted})
    })

    const data = await res.json()
    set(state => ({
      todoList: state.todoList.map(todo => todo._id === id ? {...todo, completed: data.updatedTodo.completed} : todo)
    }))
  },
  handleSearchFilterChange: (value) => {
    set(state => ({
      filters: { ...state.filters, search: value }
    }))
  },
  handleStatusFilterChange: (value) => {
    set(state => ({
      filters: { ...state.filters, status: value }
    }))
  }
}))
