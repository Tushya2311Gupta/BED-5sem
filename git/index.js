const express=require('express');
const mongoose=require('mongoose');
app.use(express.json());
const blogRouter=require('./blog_router');
app.use('/blogs',blogRouter);
app.get('/',(req,res)=>{
    res.json('Welcome to the Blog API');
});
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })