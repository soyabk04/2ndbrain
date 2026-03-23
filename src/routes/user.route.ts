import express from 'express'
import { isUser } from '../middlewares/isUser.middleware.js'
import { signin, signup } from '../controller/user.controller.js'
import { checkuserfor } from '../middlewares/userformat.middleware.js'
export const user=express.Router()
user.post("/signup",checkuserfor,isUser,signup)
user.post("/signin",checkuserfor,signin)