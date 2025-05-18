import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import blogRoutes from './Router/Blogs.router.js'
import userRoutes from './Router/User.router.js'
import connectDB from './Database/dbconfig.js'
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config()


const app=express();
app.use(express.json())
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Welcom to Aura Blogging")

})
connectDB();
app.use("/blog", blogRoutes);
app.use("/user", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(process.env.port,()=>{
    console.log("Server is running on port 3000")
})