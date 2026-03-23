import { postModel } from "../models/post.model.js";
import  { type CustomRequestPost } from "../types/post.interface.js";
import { type Response } from "express";
export async function posting(req: CustomRequestPost, res: Response) {
    const { title,content , user ,tags } = req.validateddata!;

        const post = await postModel.create({
            user,
title,content,tags
    })
    res.status(200).send({
        success: true,
        message: "account created sucessfully"
    })

}