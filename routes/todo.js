import { Router } from "express";
import { PrismaClient } from "@prisma/client";

//! Session
import { checkIfUserInSession } from "../utils/session.js";

//!  JWT
import { verifyToken } from "../utils/jwt.js";

const todoRouter = Router()

const prisma = new PrismaClient()

//! Session
todoRouter.use(async (req, res, next) => {

    const sessionToken = req?.cookies.sessionToken

    if (!sessionToken) {
        return res.status(401).send({ msg: "There is Not A Session Cookie. Please Log In" })
    }

    const user = await checkIfUserInSession(sessionToken)

    if (!user) {
        return res.status(401).send({ msg: "There is Not A Session In Database. Please Log In" })
    }


    req.userId = user.userId //! You can't get UserId in Below If This Is Not Setup 
    next()

})





//! JWT
// todoRouter.use(async (req, res, next) => {

//     const header = req?.headers.authorization
//     const jwt = header?.split(" ")[1]


//     try {
//         const user = verifyToken(jwt)
//         req.userId = user.userId
//         next()
//     } catch (e) {
//         return res.status(401).send(e)

//     }
// })


todoRouter.get("/", async (req, res) => {
    const todo = await prisma.todo.findMany({ where: { userId: req.userId } })
    return res.send(todo).status(200)
})

todoRouter.post("/", async (req, res) => {
    const userId = req.userId
    const payload = req.body
    const data = await prisma.todo.create({ data: { task: payload.task, userId } })
    return res.send(data).status(201)
})

export default todoRouter