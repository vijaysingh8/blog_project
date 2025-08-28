import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/connectionDB.js';
import userRoutes from './routes/user.routes.js';
import blogRoutes from './routes/blog.routes.js';
const app=express();
//middlewares
app.use(express.json());
// app.use(cors());

connectDB();
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin.endsWith(".vercel.app") ||
        origin === "http://localhost:5173"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.get('/',(req,res)=>{
  res.send('hello world');
});
//API endpoints
// app.use("/images",express.static("uploads"));
app.use("/user",userRoutes);
app.use("/blog",blogRoutes);
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
});