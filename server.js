const express = require("express")

const app = express();

PORT = process.env.PORT || 8000

app.get('/',(req,res)=>{
    res.send("hii welcome");
})

app.listen(PORT,()=>{
    console.log(`server is runing on PORT ${PORT}`)
})