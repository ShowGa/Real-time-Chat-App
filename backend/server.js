import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import authRoute from "./Routes/auth-Route.js";
import messageRoute from "./Routes/message-Route.js";
import userRoute from "./Routes/user-Route.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
mongoose
  .connect("mongodb://127.0.0.1/chatApp")
  .then(() => {
    console.log("Successfully connect to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

/*----Middleware----*/
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // to parse the req.body JSON payload
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

server.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
