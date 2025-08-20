const mongoose=require("mongoose")
const { type } = require("os")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    blog_count:{
        type:Number,
        default:0
    },
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Blog"
        }
    ],
    created_At:{
        type:Date,
        default:Date.now
    }
    
})

module.exports=mongoose.model("User",userSchema)