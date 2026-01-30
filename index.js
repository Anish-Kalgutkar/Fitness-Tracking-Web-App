import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRoutes);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => console.log(err));

  app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from Anish",
  });
});

app.listen(8080, () => console.log("Server is running on port 8080"));