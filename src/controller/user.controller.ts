import { userModel } from "../models/user.model.js";
import { type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcrypt"
import { refreshAndaccess } from "../utilis/token.js";
import { type CustomRequest } from "../types/user.interface.js";

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

export async function signin(req: Request, res: Response) {
    const { userName, password } = (req as any).validateddata;
    const user = await userModel.findOne({ userName })
    if (!user) {
        return res.status(404).send({
            success: false,
            message: "user not found"
        })
    }
    const hashedpass = await bcrypt.compare(password, user.password)
    if (!hashedpass) {
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
    res.status(200).send({
        success: true,
        accessToken,
        message: "logged in succesful"
    })


}