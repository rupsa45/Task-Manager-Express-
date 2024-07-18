import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app=express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit: "16kb"}))
app.use(cookieParser())


import userRouter from './routes/user.routes.js'
app.use("/api/users",userRouter);

import taskRouter from './routes/task.routes.js'
app.use("/api/tasks",taskRouter);

export default app;