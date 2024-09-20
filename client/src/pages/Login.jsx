import { useState } from "react"
import { useLogin } from "../zustand/useLogin"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  })


  const { login, isLoading} = useLogin()
  const navigate = useNavigate()

  const setFieldValue = ({ target: { name, value } }) => {
    setLoginForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(loginForm.username, loginForm.password)
    setLoginForm(prev => ({
      ...prev, username: "", password: ""
    }))
    navigate("/")
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className='w-[550px] max-h-[440px] bg-white p-5 rounded-lg'>
        <header className="shadow-inner shadow-black rounded-md p-2 mb-5">
          <h1 className="text-center text-4xl">Login</h1>
        </header>
        <div className="shadow-inner shadow-slate-300 p-3 m-5">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex-1">
              <label htmlFor="username">Username:</label>
              <input id="username" name="username" value={loginForm.username} onChange={setFieldValue} type="text" placeholder="Enter username: ..." />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input id="password" name="password" value={loginForm.password} onChange={setFieldValue} type="text" placeholder="Enter your password" />
            </div>
            <button disabled={isLoading} type="submit" onClick={handleSubmit} className="block m-auto px-4 py-2 bg-green-400 text-white rounded-lg">{isLoading ? "Loading" : "Log In"}</button>
          </form>
          <div>Haven't an account? <Link to="/signup">Create account</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Login
