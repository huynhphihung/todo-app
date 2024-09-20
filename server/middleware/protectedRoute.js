import jwt from "jsonwebtoken"
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!decodedToken) return res.status(401).json({error: "Unauthorized - Invalid token"})

    const user = await User.findById(decodedToken.userId).select("-password")

    req.user = user
    next()
  } catch (error) {
    console.log("Error in protectedRoute:", error.message)
    throw new Error(error)
  }
}
