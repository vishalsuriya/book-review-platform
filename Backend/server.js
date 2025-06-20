const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../Backend/Connection");
const BookRoutes = require("../Backend/Routes/BookRoutes");
const UserRoutes = require("../Backend/Routes/UserRoutes");
const cookieParser = require("cookie-parser");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://book-review-platform-server-cfuk.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
const port = process.env.PORT
app.use("/api/books",BookRoutes);
app.use("/api/users",UserRoutes)
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})