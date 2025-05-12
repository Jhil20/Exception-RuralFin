const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectMongo = require('./config')
const userRoutes = require('./routes/userRoutes')
const app = express()

app.use(cors({
    credentials:true
}))

connectMongo();

app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api/user",userRoutes)

app.listen(5000 ,() =>{
    try {
        console.log(`App running on Port 5000`);
    } catch (error) {
        console.log(`error in running`,error);
        
    }
})

