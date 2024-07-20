const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());

//ENV CONFIG
dotenv.config();

//routes
const userRoutes = require("./route/userRoute");
const applicaionRoutes = require("./route/applicationRoutes");

app.use("/user", userRoutes);
app.use("/application", applicaionRoutes);

const URL = `${process.env.MONGODB_URI}`;
const connectDb = async () => {
   await mongoose
      .connect(URL, {})
      .then(() => {
         console.log("Mongoose Connection established");
      })
      .catch((error) => {
         console.log("---error", error);
      });
};
connectDb();

app.get("/", (req, res) => {
   res.send("Hello server");
});

app.listen(8000, () => {
   console.log("server running on port 8000");
});
