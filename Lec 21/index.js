//Authentication and authorization
//create a server and connect database
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const User=require("./model/user")
// console.log(User)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
console.log(User)
app.get("/health", (req, res) => {
  res.send("Hello World!")
})
//end-point for signup--adding new user into database
app.post("/api/users/signup",async(req,res)=>{
    try {
        let {name,email,password} = req.body;
        let userExist=await User.findOne({email:email})
        if(userExist){
            return res.json({
                success:false,
                message:"User already exists"
            })
        }
        let newUser=new User({
            name:name,
            email:email,
            password:password
        })
        await newUser.save()
        res.json({
            success:true,
            message:"User created successfully, please login to continue"
        })
    } catch (err) {
        console.log(err.message)
        res.json({
            success: false,
            message: err.message
        })
    }
})

app.post("/api/auth/login", async (req, res) => {
    try {
        const {email,password}=req.body;
        let userExist=await User.findOne({email:email});
        if(!userExist){
            return res.json({
                success:false,
                message:"Invalid email"
            })
        }
        if(userExist.password!=password){
            return res.json({
                success:false,
                message:"Invalid password"
            })
        }
        if(userExist.password==password){
            return res.json({
                success:true,
                message:"Login successful"
            })
        }
    } catch (err) {
        console.log(err.message)
        res.json({
            success: false,
            message: err.message
        })
    }
});


mongoose.connect("mongodb://localhost:27017/mydatabase")
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch(err => {
    console.error("Could not connect to MongoDB...", err.message)
})

app.listen(3001, () => {
  console.log("Server is running on port 3000")
})
