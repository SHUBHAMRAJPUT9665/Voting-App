const express = require("express");
const router = express.Router();

const User = require("./../models/user");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newUser = new User(data);

    const response = await newUser.save();

    console.log("data saved");

    const payload = {
      id: res.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);

    console.log("Token is: ", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
    };

    const token = generateToken(payload);

    res.json({ token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "invalid Server Error" });
  }
});


router.get('/profile', jwtAuthMiddleware , async (req,res) =>{
    try {
        const userData = req.user;

        const userId = userData.id
        const user = await User.findById(userId)

        res.status(500).json({error:"internal Server Error"})
    } catch (error) {
        
    }
})