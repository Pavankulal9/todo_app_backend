import https from "https"; 
import fs from "fs"; 
import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: './.env'
});

const options = {
  key: fs.readFileSync("/etc/ssl/private/selfsigned.key"),
  cert: fs.readFileSync("/etc/ssl/certs/selfsigned.crt"),
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
