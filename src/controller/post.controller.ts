import { postModel } from "../models/post.model.js";
import  { type CustomRequestPost, type JwtPayloadCustom } from "../types/post.interface.js";
import jsonwebtoken from "jsonwebtoken";
import { type Request, type Response, } from "express";
import { JWT_SECRET } from "../config/env.js";
const jwt=jsonwebtoken
export async function posting(req: CustomRequestPost, res: Response) {
    const { title,content,tags } = req.validateddata!;
    if (!req.headers["accesstoken"] || typeof req.headers["accesstoken"] !== "string") {
  return res.status(401).send({ message: "No token" });
}
    const accessToken=jwt.verify(req.headers["accesstoken"],JWT_SECRET) as JwtPayloadCustom
    const user=accessToken.userid
        const post = await postModel.create({
            user,
title,content,tags
    })
    res.status(200).send({
        success: true,
        message: "account created sucessfully"
    })

}

export async function getpost(req:Request,res:Response){
const postid=req.params["id"]
const ipost=await postModel.findById(postid)
res.status(200).send({
    success:true,
    post:ipost
})
}

export async function getallpost(req:Request,res:Response){
        if (!req.headers["accesstoken"] || typeof req.headers["accesstoken"] !== "string") {
  return res.status(401).send({ message: "No token" });
}
    const accessToken=jwt.verify(req.headers["accesstoken"],JWT_SECRET) as JwtPayloadCustom
    const user=accessToken.userid
    const allposts=await postModel.find({user:user})
    res.status(200).send({
        success:false,
        allposts
    })
}