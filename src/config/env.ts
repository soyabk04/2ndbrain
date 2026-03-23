import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET:string = process.env.JWT_SECRET!;
export const MONGO_URI:string = process.env.MONGO_URI!;
export const FROM_EMAIL = process.env.FROM_EMAIL;
export const SENDBIRD_API = process.env.SENDBIRD_API;


