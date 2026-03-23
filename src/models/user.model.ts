import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    refreshTokens: [
{
    token: String,   // ideally hashed
    createdAt: Date
  }
]
},  {
    timestamps: true
  })
export const userModel=mongoose.model('user',userSchema)

