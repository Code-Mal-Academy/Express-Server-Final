import { Router } from "express";
import { hashPassword, comparePassword } from "../utils/password.js"
import { PrismaClient } from "@prisma/client";
import { addUserToSession, removeSession } from "../utils/session.js";
import { generateToken } from "../utils/jwt.js";
import express from "express"
import cors from "cors"

const prisma = new PrismaClient()

const authRouter = Router()


authRouter.post("/register", async (req, res) => {
    const payload = req.body

    console.log(payload)

    //! 1. Hash The Password 
    const hashedPassword = await hashPassword(payload.password)

    //! 2. Stored The Hashed Password In User Base
    await prisma.user.create({ data: { email: payload.email, password: hashedPassword } })

    //! 3. Redirect The User Back To Login Page
    return res.send({ msg: "Registered Success" }).status(301)
})

authRouter.post("/login", async (req, res) => {
    const payload = req.body

    //! 1. Get The User With Email From Database
    const user = await prisma.user.findFirst({ where: { email: payload.email } })

    //! 2. If There is No User, Redirect User To Create An Account
    if (!user) return res.status(301).send({ msg: "User Haven't Created An Account" })

    //! 3. Compare The Password
    const comparision = await comparePassword(payload.password, user.password)

    //! 4. If Password Comparing is Wrong, return error, or else, return JWT/Session
    if (comparision === false) {

        return res.status(401).send({ msg: "Wrong Password" })

    } else {

        //! Session
        const sessionId = await addUserToSession(user.id)
        res.cookie("sessionToken", sessionId)
        return res.status(200).send({ msg: "Login Sucess" })

        //! JWT
        // const jwt = generateToken({ userId: user.id })
        // return res.status(200).send({ msg: "Login Success", accessToken: jwt })
    }
})


//! Session
authRouter.post("/logout", async (req, res) => {
    const sessionId = req.cookies.sessionToken
    await removeSession(sessionId)
    res.cookie("sessionToken", null, { maxAge: 0 })
    return res.status(301).send({ msg: "Redirect To Log In" })
})

export default authRouter