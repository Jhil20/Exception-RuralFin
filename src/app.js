import express from 'express'

const app = express()

app.use(express.json({limit:"16kb"}))

import router from './routes/users.routes.js';

app.use("/users",router)
export {app};