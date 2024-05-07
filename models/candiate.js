const mongoose = require('mongoose')
// candidate schema

const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    party:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            votedAt:{
                type:Date, // <-- Corrected typo here
                default:Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default:0
    }
})

const Candidate = mongoose.model("Candidate" , candidateSchema); // <-- Corrected model name here

module.exports = Candidate;
