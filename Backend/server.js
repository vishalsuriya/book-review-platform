const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../Backend/Connection");
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})