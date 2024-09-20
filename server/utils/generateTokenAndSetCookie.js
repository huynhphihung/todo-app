import jwt from "jsonwebtoken"
export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d"
  })

  res.cookie("accessToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    sameSite: "strict"
  })
}
