import express from 'express'
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({limit:"16kb"}))
app.use(cookieParser())

import router from './routes/users.routes.js';
import routerAgent from './routes/agent.routes.js';

app.use("/users",router)
app.use("/agent",routerAgent)
export {app};