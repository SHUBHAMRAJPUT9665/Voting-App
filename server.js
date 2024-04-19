const express = require('express')
const app = express();
require('dotenv').config();

const boydParser = require('body-parser');

app.use(boydParser.json()); // req body

const PORT = process.env.PORT || 3000


app.listen(PORT , () =>{
    console.log(`server is runing on port ${PORT}`)
})