import { useState } from "react"
import { useAddTodo } from "../zustand/useAddTodo"

const SearchInput = () => {
  const [searchText, setSearchText] = useState("")
  const { handleSearchFilterChange} = useAddTodo()

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value) 
    handleSearchFilterChange(e.target.value) 
  }

  return (
    <div className="my-5 flex justify-between gap-3 items-center">
      <label>Search By Input:</label>
      <input value={searchText} onChange={handleSearchTextChange} className="flex-1 border-none outline-none p-2 shadow-inner shadow-black rounded" type="text" placeholder="Search todo by Filter:" />
    </div>
  )
}

export default SearchInput
