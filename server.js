const express = require("express")
const app = express();
require('dotenv').config();


const bodyParser = require('body-parser');

app.use(bodyParser.json());
PORT = process.env.PORT || 8000

app.get('/',(req,res)=>{
    res.send("hii welcome");
})

app.listen(PORT,()=>{
    console.log(`server is runing on PORT ${PORT}`)
})