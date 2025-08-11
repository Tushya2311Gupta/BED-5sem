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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose.connect('mongodb://127.0.0.1:27017/tushyadb')
  .then(() => console.log('Connected!'));


