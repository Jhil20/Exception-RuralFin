import { app } from "./app.js"
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

// createUserTable()

app.listen(4000 || process.env.PORT,() =>{
    try {
        console.log(`App running on Port ${process.env.PORT || 4000}`);
    } catch (error) {
        console.log(`error in running`,error);
        
    }
})

