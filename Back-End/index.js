import express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { databaseconnection } from "./db.js";
import { userRouter } from "./routes/user.js";
import { notesrouter } from "./routes/notes.js";
import { isauthorzied } from "./middlewave/auth.js";

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(Cors())
app.use(express.json())

databaseconnection()
//routes
app.use('/api/user',userRouter)
app.use('/api/notes', isauthorzied, notesrouter)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})