import {create} from "zustand"

export const useSignup = create(set => ({
  isLoading: false,
  data: {},
  signup: async (username, password) => {
    set({isLoading: true})
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password})
    })
    
    set({data: await res.json()})
    set({isLoading: false})
  }
}))
