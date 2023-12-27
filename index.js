import express from "express";
import userRouter from "./src/routes/user.js";
import bodyParser from 'body-parser';
const app = express();
import dotenv from "dotenv"; 
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const port = 8000;

app.use("/blog", userRouter);


app.listen(port, () => console.log(`Server running on port ${port}`));
