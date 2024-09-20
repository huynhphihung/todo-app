import { useState } from "react"
import { useAddTodo } from "../zustand/useAddTodo"

const SearchStatus = () => {
  const [status, setStatus] = useState("All")
  const {handleStatusFilterChange} = useAddTodo()

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
    handleStatusFilterChange(e.target.value)
  }
  return (
    <form>
      <div>
        <label>Search By Status: </label>
        <select defaultValue={status} onChange={handleStatusChange}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Todo">To do</option>
        </select>
      </div>
    </form>
  )
}

export default SearchStatus
