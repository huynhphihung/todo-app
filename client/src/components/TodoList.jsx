import Todo from "./Todo"
import { useAddTodo } from "../zustand/useAddTodo"
import { useModal } from "../zustand/useModal"
import { filteredList } from "../utils/filterTodo"
import { useEffect, useState } from "react"

const TodoList = () => {
  const { todoList, getTodoList, removeTodo, handleIsCompleted, filters, setTodoList, updateTodoStatus} = useAddTodo()
  const {handleOpenModal, setTodoId} = useModal()

  const filteredTodoList = filteredList(todoList, filters.status, filters.search)
  const [draggedItemIndex, setDraggedItemIndex] = useState(null)

  useEffect(() => {
    getTodoList()
  }, [getTodoList])

  const handleRemoveTodo = (id) => {
    removeTodo(id)
  }

  const handleUpdate = (id) => {
    handleOpenModal()
    setTodoId(id)
  }

  const handleCompleteChange = (id) => {
    const isCompleted = todoList.find(todo => todo._id === id)
    console.log(isCompleted)
    handleIsCompleted(id, isCompleted.completed)
  }

  const onDrag = (index) => {
    setDraggedItemIndex(index)
  }

  const onDrop = (e, index) => {
    e.preventDefault()
    const updatedList = [...todoList]
    const [draggedItem] = updatedList.splice(draggedItemIndex, 1)
    updatedList.splice(index, 0, draggedItem)
    setTodoList(updatedList)
    setDraggedItemIndex(null)
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="max-h-24 overflow-y-auto flex flex-col  gap-3">
      {todoList.length > 0 ? filteredTodoList.map((todo, index) => (
        
        <Todo key={todo._id} onDrop={(e) => onDrop(e, index)} onDragOver={(e) => onDragOver(e)} todo={todo.todoName} isCompleted={todo.completed}  onDragStart={() => onDrag(index)} onCompleteChange={() => handleCompleteChange(todo._id, todo.completed)} onClick={() => {handleRemoveTodo(todo._id)}} onUpdate={() => {handleUpdate(todo._id)}} />
      )) : <div className="text-3xl text-red-500 text-center">Please Add Todo</div>}
    </div>
  )
}

export default TodoList
