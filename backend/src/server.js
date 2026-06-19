import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/database.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

connectDB();


const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(
"/api/review",
reviewRoutes
);
app.get("/",(req,res)=>{

res.json({
message:"AI Code Reviewer Running 🚀"
});

});


app.listen(
process.env.PORT,
()=>{

console.log(
`Server running on ${process.env.PORT}`
);

});