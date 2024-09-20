import { useState } from "react"
import { useModal } from "../zustand/useModal"
import { useAddTodo } from "../zustand/useAddTodo"

const ModalUpdate = () => {
  const [todoName, setTodoName] = useState("")
  const {isOpen, handleCloseModal, todoId} = useModal()
  const {updateTodoName} = useAddTodo()

  const handleSubmit = (e) => {
    e.preventDefault()
    updateTodoName(todoId, todoName)
    setTodoName("")
    handleCloseModal()
  }

  return (
    <div className={`${isOpen ? "block" : "hidden"} fixed z-20 left-0 top-0 w-full h-full overflow-auto bg-black opacity-90`}>
      <div className="w-full h-full flex items-center justify-center">

      <div className="relative bg-white  p-5 rounded-md overflow-hidden z-20">
        <header className="text-4xl text-center p-4">Update Todo</header>
          <div>ID: {todoId}</div>
        <main className="mt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-2 shadow-inner shadow-orange-50">
              <label>Todo name:</label>
              <input className="flex-1" value={todoName} onChange={(e) => setTodoName(e.target.value)} type="text" placeholder="Update todo name" />
            </div>
            <div className="flex justify-end gap-5">
              <button type="submit" className="bg-green-300 p-2 rounded">Update</button>
              <button onClick={handleCloseModal} className="bg-red-700 p-2 rounded">Cancel</button>
            </div>
          </form>
        </main>
        <button onClick={handleCloseModal} className="absolute top-0 right-0 p-3 bg-red-700 text-white">X</button>
      </div>
      </div>
    </div>
  )
}

export default ModalUpdate
