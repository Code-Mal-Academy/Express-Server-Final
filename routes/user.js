import { Router } from "express"

const userRouter = Router()

userRouter.get("/", (req, res) => {
    return res.json({ msg: "Hello, There" })
})

userRouter.get("/hello", (req, res) => {
    return res.json({ msg: "Hi There" })
})

export default userRouter

