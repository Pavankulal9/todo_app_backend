
import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server Connected to PORT:${process.env.PORT}`);
    });
});





