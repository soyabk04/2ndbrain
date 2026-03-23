import { requiredbodypost } from "../middlewares/postformat.middleware.js";
import {z} from "zod"
import { type Request } from "express";
type data = z.infer<typeof requiredbodypost>
export interface CustomRequestPost extends Request {
  validateddata?: data
}