import express from 'express'
import "dotenv/config"
import cors from "cors"
import dbConnect from './lib/dbConnect.js';
import authRouter from './routes/userRoutes.js';
import todoRouter from './routes/todoRoutes.js';

const app = express();
const PORT = 5000

//middlewares

app.use(cors())
app.use(express.json())

await dbConnect()

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/api/auth",authRouter)
app.use("/todo",todoRouter)


app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT)
})