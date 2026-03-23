import { requiredbodyuser } from "../middlewares/userformat.middleware.js";
import {z} from "zod"
import { type Request } from "express";
type data = z.infer<typeof requiredbodyuser>
export interface CustomRequest extends Request {
  validateddata?: data
}