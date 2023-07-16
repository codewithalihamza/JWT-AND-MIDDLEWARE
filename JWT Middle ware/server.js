import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import dbConnection from "./Database/db.js";
import router from "./Routes/authRouter.js";
import cors from 'cors'
import morgan from "morgan";

// express unpack in variable
const app = express();
app.use(express.json());
// dotenv config
dotenv.config();
//database connection
dbConnection();
//cors
app.use(cors());
//morgan
app.use(morgan('dev'));
// router
app.use('/api',router)


//dotenv PORT  // ha jb b koi env ki chz ko use krna ho to wha process.env is k sth jo chz use krni ho likhni hy okY😘
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`.bgYellow);
});
