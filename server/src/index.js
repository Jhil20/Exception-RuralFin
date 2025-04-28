import express, { urlencoded } from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

app.use(cors({
    credentials:true
}))


app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.listen(5000 ,() =>{
    try {
        console.log(`App running on Port 5000`);
    } catch (error) {
        console.log(`error in running`,error);
        
    }
})

