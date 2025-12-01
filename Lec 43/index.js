const express=require("express");
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/sum",(req,res)=>{
    let {a,b}=req.body;
    res.json({
        success:true,
        data:a+b
    })
});

module.exports=app;