const express=require("express");
const mongoose = require("mongoose");
const {postaddBlog,getreadBlog,getOneBlog,deleteOneBlog}=require("../controller/blogController");
const { app } = require("..");
const Blogs = require("../model/blog");
const User = require("../model/user");
const router = express.Router() //small --> app
router.post("/blogs", postaddBlog);
router.get("/blogs", getreadBlog);
router.get("/blogs/:id", getOneBlog);
router.delete("/blogs/:id", deleteOneBlog);

router.post("/blogs", async (req, res) => {
  let { title, body, userId } = req.body;

  let userExist = await User.findById(userId);

  if (!userExist) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  let newBlog = new Blogs({
    title,
    body,
    date: new Date(),
    userid: userId, // ✅ matches schema in blog.js
  });

  await newBlog.save();

  userExist.blogs.push(newBlog._id);
  await userExist.save(); // ✅ persist array change

  res.json({
    success: true,
    data: newBlog,
    message: "Blog added successfully",
  });
});

router.get("/blogs", async (req, res) => {
  let allblogs = await Blogs.find();
  res.json({
    success: true,
    data: allblogs,
  });
});
router.get("/blogs/:id", async (req, res) => {
  let { id } = req.params;
  let blog = await Blogs.findOne({ _id: id });
  res.json({
    success: true,
    data: blog,
  });
});

router.post("/users", async (req, res) => {
  let { email, username, password } = req.body;

  let newUser = new User({
    email: email,
    username: username,
    password: password,
  });

  await newUser.save();
  res.json({
    success: true,
    data: newUser,
    message: "User added successfully",
  });
});

router.get("/users", async (req, res) => {
  let allUsers = await User.find();
  res.json({
    success: true,
    data: allUsers,
  });
});

// Get single user by ID
router.get("/users/:id", async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id).populate("blogs"); // ✅ fetch blog objects
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({
    success: true,
    data: user,
  });
});

//delete blog
router.delete("/blogs/:blogId", async (req, res) => {
  let { blogId } = req.params;
  let { userId } = req.body;

  let blogExist = await Blogs.findById(blogId);
  console.log(blogExist);
  if (!blogExist)
    return res.json({
      success: false,
      message: "Blog does not exist",
    });

  console.log("blog userid:", blogExist.userId);
  console.log("request userid:", userId);

  if (String(blogExist.userId) !== String(userId)) {
    return res.json({
      success: false,
      message: "you are not allowed to delete this blog",
    });
  }

  await Blogs.findByIdAndDelete(blogId);

  let userExist = await User.findById(userId);
  let blog = userExist.blogs.filter((id) => id != blogId);
  userExist.blogs = blog;

  await userExist.save();
  console.log("bbbbbbbbbbbbbbbbb");
  res.json({
    success: true,
    message: "blog deleted successfully",
    data: userExist,
  });
});
 
module.exports = router;
