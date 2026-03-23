import { userModel } from "../models/user.model.js";
import { type Request, type Response, type NextFunction } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { refreshAndaccess } from "../utilis/token.js";
import { type CustomRequest } from "../types/user.interface.js";
import { JWT_SECRET } from "../config/env.js";

export async function signup(req: CustomRequest, res: Response) {
    const { userName, password } = req.validateddata!;

    const hashedpass = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        userName,
        password: hashedpass
    })
    res.status(200).send({
        success: true,
        message: "account created sucessfully"
    })

}

export async function signin(req: CustomRequest, res: Response) {
try{    
    const { userName, password } = req.validateddata!;
    const user = await userModel.findOne({ userName })
    if (!user) {
        
        return res.status(404).send({
            success: false,
            message: "user not found"
        })
    }
    const ispassvalid = await bcrypt.compare(password, user.password)
    if (!ispassvalid) {
        return res.status(401).send({
            success: false,
            message: "wrong password"
        })
    }
    const { refreshToken, accessToken } = refreshAndaccess(user)
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    user.refreshTokens.push({ token: refreshToken })
    await user.save()
    return res.status(200).send({
        success: true,
        accessToken,
        message: "logged in succesful"
    })
    
}catch(e:any){
        res.status(500).send({
            success:false,
            message:'internal server error'
        })
    }


}
export async function logout(req: Request, res: Response) {
    const token = req.cookies.refreshToken
    const decoded = jwt.verify(token, JWT_SECRET) as { userid: string }
    const user:any = await userModel.findById(decoded.userid)
    user.refreshTokens.pull({ token: token })
    await user.save()
    res.clearCookie("refreshToken")
    res.status(200).send({success:true})
}