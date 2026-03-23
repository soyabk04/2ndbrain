import {MONGO_URI} from './env.js'
import mongoose from 'mongoose'
// const ApiError=require('../utils/AppError')

export async function main() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("DB connected")
    } catch (err:any) {
        console.error("Database connection failed:", err.message)
       
    }
}

