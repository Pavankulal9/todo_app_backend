import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    // Start the HTTPS server
    app.listen(process.env.PORT, () => {
      console.log(`Server Connected to PORT:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
