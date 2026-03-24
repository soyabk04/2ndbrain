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
    const posttitle=title.toLowerCase()
        const post = await postModel.create({
            user,
title:posttitle,content,tags
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

export async function getallpost(req:CustomRequestPost,res:Response){
        if (!req.headers["accesstoken"] || typeof req.headers["accesstoken"] !== "string") {
  return res.status(401).send({ message: "No token" });
}
    const accessToken=jwt.verify(req.headers["accesstoken"],JWT_SECRET) as JwtPayloadCustom
    const user=accessToken.userid
    const allposts=await postModel.find({user:user})
    res.status(200).send({
        success:true,
        allposts
    })
}

export async function searchpost(req:Request,res:Response){
        if (!req.headers["accesstoken"] || typeof req.headers["accesstoken"] !== "string") {
  return res.status(401).send({ message: "No token" });
}
    const title=req.body.title.toLowerCase()
    const post=await postModel.find({title:title})
    res.status(200).send({
        success:true,
        post
    })
}