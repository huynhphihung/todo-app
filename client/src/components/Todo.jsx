
const Todo = ({ todo, onClick, onUpdate, isCompleted, onCompleteChange, onDragStart, onDragOver, onDrop}) => {
  return (
    <div className='flex gap-6' draggable onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver} >
      <div onClick={onCompleteChange} className={`flex-1 ${isCompleted ? "line-through decoration-solid decoration-red-600" : ""} cursor-pointer select-none`}>{todo}</div>
      <button onClick={onUpdate} className="bg-sky-200 text-black p-2 rounded-md">Update</button>
      <button onClick={onClick} className="bg-red-400 p-2 rounded-md">Delete</button>
    </div>
  )
}

export default Todo
