import express from 'express'
import { checkpostfor } from '../middlewares/postformat.middleware.js'
import { posting } from '../controller/post.controller.js'
export const posts=express.Router()
posts.post("/",checkpostfor,posting)
