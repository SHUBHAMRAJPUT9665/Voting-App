const express = require('express');
const router = express.Router();
const Candidate = require('./../models/candiate');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const User = require('../models/user');


const checkAdminRole = async (userId) =>{
    try{
        const user = await User.findById(userId)
        return user.role == 'admin'
    }
    catch(error){
        return false;
    }
}

// Profile route
router.get('/', async (req, res) => {
    try{
        if(!checkAdminRole(req.user.id)){
            return res.status(404).json({message:"user has not admin role"})
        }
        const data = req.body
        const newCandidate = new Candidate(data)

        const response = await newCandidate.save()

        console.log("data saved");
        res.status(200).json({response: response})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if(!checkAdminRole(req.user.id)){
            return res.status(404).json({message:"user has not admin role"})
        }
        const candidateId = req.user.id; // Extract the id from the token
        const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

        // Check if currentPassword and newPassword are present in the request body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
        }

        // Find the user by userID
        const user = await User.findById(userId);

        // If user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        console.log('password updated');
        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;