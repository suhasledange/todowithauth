import express from 'express'
import "dotenv/config"
import cors from "cors"
import dbConnect from './lib/dbConnect.js';
import authRouter from './routes/userRoutes.js';
import todoRouter from './routes/todoRoutes.js';
import cookieParser from "cookie-parser";


const app = express();
const PORT = 5000

//middlewares

app.use(cookieParser());
app.use(cors({
     credentials: true
}))
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