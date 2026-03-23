import express from 'express'
import { isUser,isUsernotLoggedin,isUserLoggedin } from '../middlewares/isUser.middleware.js'
import { signin, signup,logout } from '../controller/user.controller.js'
import { checkuserfor } from '../middlewares/userformat.middleware.js'
export const user=express.Router()
user.post("/signup",isUserLoggedin,checkuserfor,isUser,signup)
user.post("/signin",isUserLoggedin,checkuserfor,signin)
user.post("/logout",isUsernotLoggedin,logout)