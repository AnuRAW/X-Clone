import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./DB/connectMongoDB.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Add middleware to parse JSON requests
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
  // to parse from data(urlencoded)
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});