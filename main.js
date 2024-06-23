import express from "express"
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
import sse from "./routes/sse.js"
import cookieParser from "cookie-parser"
import todoRouter from "./routes/todo.js"
import cors from "cors"

const app = new express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};



app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/todo', todoRouter)
app.use("/sse", sse)

app.listen(8080, () => {
})

// webSocketServer.listen(3000, () => {
//     console.log(`WebSocket Server is running on port ${3000}`);
// });

export default app