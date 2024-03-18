require("dotenv").config();
const express = require('express');
const mongodbConnection = require('./model/connection')
const taskRouter = require('./routes/taskRoute')
const userRouter = require('./routes/userRoutes'); 
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser())
//using route
app.use('/api/v1/users',userRouter);
app.use('/api/v1/task', taskRouter)
app.use(cors({
    origin: [process.env.frontendURI],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true
}))

app.get('/', (req,res)=>{
    res.send("Hi")
})


app.listen(port, async ()=>{
    console.log(`https://localhost:${port} is connected in ${process.env.node_env}`)
    await mongodbConnection(process.env.mongoDB_url)
})


