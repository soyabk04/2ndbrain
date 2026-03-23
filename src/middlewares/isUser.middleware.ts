import { userModel } from "../models/user.model.js"
import { type Request, type Response ,type NextFunction } from "express";
import { type CustomRequest } from "../types/user.interface.js";
export async function isUser(req:CustomRequest, res:Response, next:NextFunction) {
    try {
        const { userName } =req.validateddata!;
        const isexits = await userModel.findOne({
              userName
        })
        if (isexits) {
            return res.status(409).send({
                success:false,
                message: 'user already exists'
            })
        }
    } catch (e:any) {
        e.message = "user authentication failed"
        e.status = '500'
        next(e)
    }
    next()
}

export async function isUsernotLoggedin(req:CustomRequest, res:Response, next:NextFunction) {
    try {
        const isexits = req.cookies.refreshToken
        if (!isexits) {
            return res.status(409).send({
                success:false,
                message: 'you are not logged in'
            })
        }
         next()
    } catch (e:any) {
        e.message = "user authentication failed"
        e.status = '500'
        next(e)
    }
}

export async function isUserLoggedin(req:CustomRequest, res:Response, next:NextFunction) {
    try {
        const isexits = req.cookies.refreshToken
        if (isexits) {
            return res.status(409).send({
                success:false,
                message: 'you are already logged in'
            })
        }
         next()
    } catch (e:any) {
        e.message = "user authentication failed"
        e.status = '500'
        next(e)
    }

}