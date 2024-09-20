import { useState } from "react"
import { useAddTodo } from "../zustand/useAddTodo"

const AddTodo = () => {
  const [todoInput, setTodoInput] = useState("")
  const { addTodo } = useAddTodo()


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!todoInput) return
    addTodo({ todoName: todoInput, completed: false})
    setTodoInput("")
  }

  return (
    <div className="">
      <form className="flex" onSubmit={handleSubmit}>
        <input value={todoInput} onChange={(e) => setTodoInput(e.target.value)} className="border border-gray-200 flex-1 p-2 rounded-l-md" type='text' placeholder="Add Todo:" />
        <button onClick={handleSubmit} className="bg-green-200 p-2 rounded-r-md">Add Todo</button>
      </form>
    </div>
  )
}

export default AddTodo
