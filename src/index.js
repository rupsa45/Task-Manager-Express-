import connectDB from "./config/connectDB.js";
import app from "./app.js";
import dotenv from "dotenv";
import morgan  from 'morgan';

dotenv.config({
    path:'./.env'
})

app.use(morgan('dev'));

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 4000,()=>{
        console.log(`Server is running on port :  http://localhost:${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log('Error connecting to database',error) ;   
})
