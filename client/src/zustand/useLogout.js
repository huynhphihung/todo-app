import { create } from "zustand";
import { serverUrl } from "../variables";

export const useLogout = create(set => ({
  logout: async () => {
    await fetch(`${serverUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include"
    }) 
  }
}))
