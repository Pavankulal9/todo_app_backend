import https from "https"; 
import fs from "fs"; 
import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: './.env'
});

const options = {
  key: fs.readFileSync("/home/ubuntu/ssl/selfsigned.key"),
  cert: fs.readFileSync("/home/ubuntu/ssl/selfsigned.crt"),
};

connectDB()
  .then(() => {
    // Start the HTTPS server
    https.createServer(options, app).listen(process.env.PORT, () => {
      console.log(`Server connected to PORT: ${process.env.PORT} and running on HTTPS`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
