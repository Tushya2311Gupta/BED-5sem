const express = require("express");
const path = require("path");
const mongoose= require("mongoose")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const user = require("./model/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "okkk";


const isLogin = (req, res, next) => {
  let token = req.headers.authorization;

  if(!token){
    return res.json({
      success:false,
      message:"no token provided , please login"
    })
  }

    //token aa rha hai
    let decode = jwt.verify(token,"meww");
    if(!decode){
      return res.json({
        success:false,
        message:"invalid token"
      })
    }

    req.userId = decode.userId;
    next();
  };


//adding a blog to database

app.post("/blogs", isLogin, async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.userId;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "title and body are required"
      });
    }

    const userExist = await user.findById(userId);
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const newBlog = new Blogs({
      title: title,
      body: body,
      date: Date.now(),
      userId: userId
    });

    await newBlog.save();
    userExist.blogs.push(newBlog._id);
    await userExist.save();

    return res.json({
      success: true,
      data: newBlog,
      message: "blog added successfully"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
})


//getting all blog
app.get("/blogs",async(req,res)=>{
   let allblog= await Blogs.find();
   res.json({
        success:true,
        data:allblog
   }) 
})


// getting single blog
app.get("/blogs/:id",async(req,res)=>{
    let {id}= req.params
    let blog= await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })
})




//user
app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields (username, email, password) are required."
    });
  }
  // Check if email already exists
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email is already registered. Please login or use another email."
    });
  }
  const newUser = new user({ username, email, password });
  await newUser.save();
  res.json({
    success: true,
    data: newUser,
    message: "Signup successful!"
  });
});
app.get("/users",async(req,res)=>{
   let allusers= await user.find();
   res.json({
        success:true,
        data:allusers
   })
})



// login route - generate JWT with payload { userId: user._id }
app.post("/login", async (req, res) => {
  let {email,password} = req.body;
  let userExist = await user.findOne({email:email});
  if(!userExist){
    return res.json({
      success:false,
      message:"please signup first because user doesnt exist"
    })
  }
  if(userExist.password!=password){
    res.json({
      success:false,
      message:"incoorect password"
    })
  }

  //generate token
  let token = jwt.sign({"userId":userExist._id},"meww");
  res.json({
    success:true,
    message:"login successfully",
    token:token 
  })
})


//delete a blog user id
app.get("/users/:id",async(req,res)=>{
    let {id}= req.params
    let userExist= await user.findOne({_id:id}).populate("blogs")
    if(userExist){
    res.json({
        success:true,
        data:userExist
    })
  }
})


//delete blog
app.delete("/blogs/:blogId",async(req,res)=>{
  let {blogId}= req.params;
  let  {userId}= req.body;
  let blogExist = await Blogs.findById(blogId);
  if(!blogExist) return res.json({
    success:false,
    message:"Blog doest not exist"
  })
  if(blogExist.userId!=userId) return res.json({
    success:false,
    message:"You are not allowed to delete this blog"
  })
  await Blogs.findByIdAndDelete(blogId);
  console.log("aaaaaaaaaaaaaaaaaaaaaa")
  let userExist = await user.findById(userId);
  let blog= userExist.blogs.filter((id)=> id!=blogId)
  userExist.blogs=blog
  await userExist.save();
  console.log("bbbbbbbbbbbbbbb")
  res.json({
    success:true,
    message:"blog deleted successfully",
    data:userExist
  })
})


mongoose.connect("mongodb://localhost:27017/mydatabase")
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch(err => {
    console.error("Could not connect to MongoDB...", err.message)
})

app.listen(3001, () => {
  console.log("Server is running on port 3001")
})