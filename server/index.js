import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import quotationRouter from "./routes/quotation.routes.js";
import offerRouter from "./routes/offer.routes.js";

dotenv.config();

const port = process.env.PORT;

const __dirname = path.resolve();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/quotations", quotationRouter);
app.use("/api/offers", offerRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

connectDB()
  .then(() =>
    app.listen(port, () => console.log(`Server started on port: ${port}`))
  )
  .catch((error) => console.log(error.message));
