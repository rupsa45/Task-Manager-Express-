import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config({
  path: "./.env",
});
import express from "express";

import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `Server is running on port :  http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

app.get("/health",asyncHandler(async(req,res)=>{
  res.send({meassage:"health is ok!"})
}))
import userRouter from "./routes/user.routes.js";
app.use("/api/users", userRouter);

import taskRouter from "./routes/task.routes.js";
import { asyncHandler } from "./utils/asyncHandler.js";
app.use("/api/tasks", taskRouter);
