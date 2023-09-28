const express = require("express");
const userRouter = require("./routes/userRoutes");
require('./config/modelConfig')

const app = express();
const port = 10000;
app.use(express.json())
app.use('/', userRouter)

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
})

