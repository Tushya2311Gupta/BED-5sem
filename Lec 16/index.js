const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./model/user");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/blogs", async (req, res) => {
    let{title,body}=req.body;
  let newBlog=new Blog({
        title:title,
        body:body,
        date:Date.now()
    })
    await newBlog.save()
    res.json({
        success:true,
        data:newBlog,
        message:"Blog created successfully"
    })

});
app.post("/users", async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({
        username: username,
        email: email,
        password: password
    });
    await newUser.save();
    res.json({
        success: true,
        data: newUser,
        message: "User created successfully"
    });
});

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json({
        success: true,
        data: users
    });
});

app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    res.json({
        success: true,
        data: user
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose.connect('mongodb://127.0.0.1:27017/tushyadb')
  .then(() => console.log('Connected!'));


// create a user schema in which username, email, and password are required fields and create three routes consisting post get and get a single user in index.js

