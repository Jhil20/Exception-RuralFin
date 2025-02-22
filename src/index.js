import { app } from "./app.js"
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

// createUserTable()

app.listen(5000 || process.env.PORT,() =>{
    try {
        console.log(`App running on Port ${process.env.PORT}`);
    } catch (error) {
        console.log(`error in running`,error);
        
    }
})

