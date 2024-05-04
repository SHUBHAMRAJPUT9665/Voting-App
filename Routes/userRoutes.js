const express = require("express")
const router = express.Router();

const User = require('./../models/user')
const {jwtAuthMiddleware , generateToken} = require('./../jwt')



router.post('/signup' , async (req,res) =>{
    try {
        const data = req.body

        const newUser = new User(data)

        const response = await newUser.save()

        console.log("data saved")

        const payload = {
            id:res.id , 
            username:response.username
        }
        console.log(JSON.stringify(payload))
        const token = generateToken(payload)

        console.log("Token is: ",token)

        res.status(200).json({response: response , token:token})
    } catch (error) {
        
    }
})