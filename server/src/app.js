import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
app.use(cors())

import router from './routes/users.routes.js';
import routerAgent from './routes/agent.routes.js';
import routerAdmin from './routes/admin.routes.js';
import transaction from './routes/transaction.routes.js'

app.use("/users",router)
app.use("/agent",routerAgent)
app.use("/admin",routerAdmin)
app.use('/transaction',transaction)
export {app};