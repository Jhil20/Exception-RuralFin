import express from 'express'
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({limit:"16kb"}))
app.use(cookieParser())

import router from './routes/users.routes.js';

app.use("/users",router)
export {app};