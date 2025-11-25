const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;
const mongoose=require('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.json({message:'Welcome to the API'});
});
app.use("/api/users",require("./routes/user_router"));
app.use("/api/products",require("./routes/blog_router"));
const blogRouter=require('./routes/blog_router');
app.use('/blogs',blogRouter);
app.get('/',(req,res)=>{
    res.json('Welcome to the Blog API');
});
mongoose.connect('mongod://127.0,0.1:27017/test',)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.error('Error connecting to MongoDB',err);
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});