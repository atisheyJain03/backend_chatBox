import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import dotenv from "dotenv";
import cors from "cors";
import router from "./route.js";
import compression from "compression";

const app = express();
app.use(compression());

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(cors());
// console.log(process.env.DB_PASSWORD);

const dbURL = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.j99hu.gcp.mongodb.net/WhatsAppdb?retryWrites=true&w=majority`;

mongoose
  .connect(dbURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    // console.log("DB Connected successfully ");
  })
  .catch((err) => console.log(err.message));

var pusher = new Pusher({
  appId: "1067561",
  key: "4bada21a2e4ed2a6f96a",
  secret: "a45a0f1957b89d1fc090",
  cluster: "ap2",
  encrypted: true,
});

app.use("/", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is listening at port " + port);
});
