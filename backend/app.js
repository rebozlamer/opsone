require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = 4001;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/oneResume")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => {
    console.log(err, "err from Mongodb");
  });

// Routes
app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
