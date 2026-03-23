import { z } from "zod";
import { type Request, type Response, type NextFunction } from "express";
import { type CustomRequest } from "../types/user.interface.js";


export const requiredbodyuser = z.object({
  userName: z.string().min(3).max(100),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[@$!%*?&]/, "Must contain special character"),
})

export function checkuserfor(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  ;

  const parsedwithsuccess = requiredbodyuser.safeParse(req.body);


  if (!parsedwithsuccess.success) {
    return res.status(401).send({
      success: false,
      message: parsedwithsuccess.error.issues,
    });
  }

  req.validateddata = parsedwithsuccess.data;

  next();
}