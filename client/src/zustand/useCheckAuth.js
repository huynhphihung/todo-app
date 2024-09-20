import { create } from "zustand";
import { serverUrl } from "../variables";


export const useCheckAuth = create(set => ({
  isLoading: false,
  isAuthenticated: false,
  hasCheckedAuth: false,
  user: null,
  checkAuth: async () => {
    try {
      set({ isLoading: true})
      const res = await fetch(`${serverUrl}/api/auth/check-auth`, {
        credentials: "include"
      })

      const data = await res.json()

      set({ user: data.user, isLoading: false, isAuthenticated: !!data.user, hasCheckedAuth: true})
    } catch (error) {
      set({isAuthenticated: false, isLoading: false, hasCheckedAuth: false})
      throw new Error(error)
    }
  }
}))
