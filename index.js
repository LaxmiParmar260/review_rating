require("dotenv").config();
require("./config/modelConfig");
const express = require("express");

// for cron job
const cron = require("node-cron");
const commonRouter = require("./routes/mainRoutes");
const PORT = process.env.PORT || 5000;
const HOST = "localhost";
const app = express();
app.use(express.json());
app.use("/", commonRouter);
// Creating a cron job which run every 10 second
// cron.schedule("*/3 * * * * * ", function () {
//   console.log("running a task every 10 second");
// });
// api for email sending
// app.get("/send", async (req, res) => {
//   transporter.sendMail(emailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email Sent Successfully" + info.response);
//       res.send("successully");
//     }
//   });
// });

app.listen(PORT, (req, res) => {
  console.log(`server is running on port: http://${HOST}:${PORT}`);
});
