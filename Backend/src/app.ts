import { config } from "dotenv";
import express from "express";
import morgan from "morgan"
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

config()
const app = express()


app.use(express.json(), express.urlencoded({ extended: true }),
    cookieParser(process.env.COOKIE_SECRET),  cors({origin: "http://localhost:5173", credentials: true}))
// remove it after prod
app.use(morgan("dev"))
app.use("/api/v1", router)

export default app