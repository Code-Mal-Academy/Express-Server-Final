import { randomUUID } from "crypto"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const addUserToSession = async (userId) => {
    const uuid = randomUUID()

    await prisma.session.create({ data: { uuid: uuid, userId: userId } })

    return uuid

}

const checkIfUserInSession = async (uuid) => {

    const user = await prisma.session.findFirst({ where: { uuid: uuid } })

    if (!user) return false

    return user
}

const removeSession = async (uuid) => {
    return await prisma.session.delete({ where: { uuid: uuid } })
}

export { addUserToSession, checkIfUserInSession, removeSession }