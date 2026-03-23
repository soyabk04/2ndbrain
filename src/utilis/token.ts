import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
const jwt=jsonwebtoken
export function refreshAndaccess(user:any){
    const refreshToken=jwt.sign({userid:user._id},JWT_SECRET,{ expiresIn: "7d" })
    const accessToken=jwt.sign({userid:user._id,role:user.role},JWT_SECRET,{ expiresIn: "15m" })
    return{refreshToken,accessToken}
}