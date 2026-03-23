import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import { main } from './config/db.js';
import { user } from "./routes/user.route.js";
import { posts } from "./routes/post.route.js";
import cookieParser from "cookie-parser";
const app=express()
app.use(cookieParser())
app.use(express.json()) 
app.use('/user',user)
app.use('/post',posts)

app.listen(3000,main)