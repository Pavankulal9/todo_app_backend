import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: `${process.env.TEST_CORS_ORIGIN}`,
    credentials: true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"16kb",extended:true}));
app.use(express.static('public'));
app.use(cookieParser());

//* Routes
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";

app.use('/api/v1/users', userRouter);
app.use('/api/v1/todo', todoRouter);
export {app};

