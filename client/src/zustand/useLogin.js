import {create} from "zustand"
import { serverUrl } from "../variables"

export const useLogin = create(set => ({
  isLoading: false,
  data: {},
  login: async (username, password) => {
    set({isLoading: true})
    const res = await fetch(`${serverUrl}/api/auth/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password}),
      credentials: "include"
    })

    set({data: await res.json()})
    set({isLoading: false})
  }
}))
