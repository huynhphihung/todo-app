import AddTodo from "./AddTodo"
import ModalUpdate from "./ModalUpdate"
import SearchInput from "./SearchInput"
import TodoList from "./TodoList"
import { useModal } from "../zustand/useModal"
import { useAddTodo } from "../zustand/useAddTodo"
import SearchStatus from "./SearchStatus"
import { useLogout } from "../zustand/useLogout"
import { useNavigate } from "react-router-dom"

const TodoApp = () => {
  const { isOpen } = useModal()
  const { removeTodoList } = useAddTodo()
  const { logout } = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const handleDelteAllTodo = () => {
    removeTodoList()
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[550px] max-h-[540px] bg-white rounded-md overflow-hidden px-5 py-5 shadow-lg shadow-black">
        <header className="">
          <h1 className="text-4xl text-center shadow-inner shadow-orange-300 p-2">Todo App</h1>
        </header>
        <main className="flex items-center justify-between flex-col gap-3">
          <div className="w-full">
            <SearchInput />
          </div>
          <div>
            <SearchStatus />
          </div>
          <div className="w-full shadow-inner shadow-red-100 p-4 rounded-md">
            <TodoList />
          </div>
          <button className="bg-red-400 p-2 rounded-md text-white" onClick={handleDelteAllTodo}>Delete All</button>
          <div className="w-full">
            <AddTodo />
          </div>
        </main>
        <ModalUpdate isOpen={isOpen} />
      </div>
      <button onClick={handleLogout} className="absolute top-0 right-0 px-4 py-2 bg-red-300">Log out</button>
    </div>
  )
}

export default TodoApp
