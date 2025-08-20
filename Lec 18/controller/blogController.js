const Blogs = require("../model/blog");
const User = require("../model/user");

module.exports.addBlog=async (req, res) => {
  let { title, body, userId } = req.body;

  let userExist = await User.findById(userId);

  if (!userExist) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  let newBlog = new Blogs({
    title,
    body,
    date: new Date(),
    userid: userId, 
  });

  await newBlog.save();

  userExist.blogs.push(newBlog._id);
  await userExist.save(); 

  res.json({
    success: true,
    data: newBlog,
    message: "Blog added successfully",
  });
}
