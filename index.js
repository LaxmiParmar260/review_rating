const express = require("express");
require("dotenv").config();
const connectDB = require("./config/modelConfig");
const commonRouter = require("./routes/mainRoutes");

// for cron job
const cron = require("node-cron");

//Middlewares
const app = express();
const PORT = process.env.PORT || 5000;

//DB connection
connectDB();

//Body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Default Route
app.get("/", (req, res) => {
  res.json({
    mes: "Welcome to our CRUD API",
  });
});

// Review-Rating Router
app.use("/", commonRouter);

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});
