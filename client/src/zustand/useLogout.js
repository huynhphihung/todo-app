import { create } from "zustand";

export const useLogout = create(set => ({
  logout: async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    }) 
  }
}))
