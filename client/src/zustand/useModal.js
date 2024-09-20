import { create } from "zustand"

export const useModal = create((set) => ({
  isOpen: false,
  todoId: "",
  handleOpenModal: () => {
    set({isOpen: true})
  },
  handleCloseModal: () => { 
    set({isOpen: false})
  },
  setTodoId: (id) => {
    set({todoId: id})
  }
}))
