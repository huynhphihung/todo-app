import bcrypt from "bcryptjs"
import User from "../models/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) res.status(400).json({ error: true, message: "User already exists; Pleasa try agian" })

    const genSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, genSalt)

    const newUser = new User({
      username,
      password: hashedPassword
    })

    if (newUser) {
      await newUser.save()
      generateTokenAndSetCookie(newUser._id, res)
      return res.status(200).json({
        error: false, message: "Sign up successfully", user: {
          userId: newUser._id,
          username: newUser.username
        }
      })
    }

    return res.status(400).json({ error: true, message: "Error in sign up; Please try again" })
  } catch (error) {
    console.log("Error in authController/signup", error)
    throw new Error(error)
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!user || !isPasswordCorrect) return res.status(400).json({ error: true, message: "User not found or incorrect password; Please try again" })

    generateTokenAndSetCookie(user._id, res)
    return res.status(200).json({
      error: false, message: "Log in successfully", user: {
        userId: user._id,
        username: user.username
      }
    })

  } catch (error) {
    console.log("Error in authController/login", error)
    throw new Error(error)
  }
}

export const getUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id)


    return res.status(200).json({ user })
  } catch (error) {
    console.log("error in get User", error)
  }
}

export const logout = async (req, res) => {
  res.clearCookie("accessToken")
  return res.status(200).json({ message: "Logged out successfully" })
}


