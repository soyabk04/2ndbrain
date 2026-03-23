
import { z } from "zod/mini"
import { type Response, type NextFunction } from "express";
import { type CustomRequestPost } from "../types/post.interface.js";

export const requiredbodypost = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string())
})

export function checkpostfor(
  req: CustomRequestPost,
  res: Response,
  next: NextFunction
) {
  const parsedwithsuccess = requiredbodypost.safeParse(req.body);


  if (!parsedwithsuccess.success) {
    return res.status(401).send({
      success: false,
      message: parsedwithsuccess.error.issues,
    });
  }

  req.validateddata = parsedwithsuccess.data;

  next();
}