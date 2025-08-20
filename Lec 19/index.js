const express = require("express");
const { m1,m2 ,m3} = require("./middleware/firstmiddleware");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname+"/public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(m1)
//app.use(m2)
app.get("/health",m3,(req,res,next)=>{
    console.log("Health check endpoint hit");
    //next
    res.json({
        status: "success",
        message: "Health check successful",
        userId: req.userid,
        isAdmin: req.isAdmin
    });
})
app.use("/home",(req,res,next)=>{
    console.log("Home endpoint hit");
    next();
})
app.use(m2)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});