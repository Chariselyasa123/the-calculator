import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "../src/routes/index.js";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose.connect("mongodb://localhost:27017/mern-calculator", () => {
  console.log("connectted to mongodb");
});

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);

export default app;
