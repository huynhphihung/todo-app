import { useState } from "react"

import { useSignup } from "../zustand/useSignup"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: ""
  })

  const { signup, isLoading} = useSignup()
  const navigate = useNavigate()

  const setFieldValue = ({ target: { name, value } }) => {
    setSignupForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(signupForm.username, signupForm.password)
    navigate("/")
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className='w-[550px] max-h-[440px] bg-white p-5 rounded-lg'>
        <header className="shadow-inner shadow-black rounded-md p-2 mb-5">
          <h1 className="text-center text-4xl">Sign Up</h1>
        </header>
        <div className="shadow-inner shadow-slate-300 p-3 m-5">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex-1">
              <label htmlFor="username">Username:</label>
              <input id="username" name="username" value={signupForm.username} onChange={setFieldValue} type="text" placeholder="Enter username: ..." />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input id="password" name="password" value={signupForm.password} onChange={setFieldValue} type="text" placeholder="Enter your password" />
            </div>
            <button type="submit" onClick={handleSubmit} className="block m-auto px-4 py-2 bg-green-400 text-white rounded-lg">{isLoading ? "Loading" : "Sign Up"}</button>
          </form>
          <div>Already have an account. <Link to="/login">Log in</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Signup
