import express from 'express';
import userRouter from './src/routes/user.js';
import postRouter from './src/routes/post.js';
import commentRouter from './src/routes/comments.js';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

const port = 8000;

app.use('/', userRouter);
app.use('/', postRouter);
app.use('/comment', commentRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
