import * as dotenv from 'dotenv'
dotenv.config()

export const MONGO = process.env.MONGO || "mongodb://127.0.0.1:27017/e-shop"
export const PORT = process.env.PORT || 3000