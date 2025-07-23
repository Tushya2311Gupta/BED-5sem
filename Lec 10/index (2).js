const express=require("express");
const app= express();

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index(2).html");
})
app.get("/about", (req, res)=>{
   res.sendFile(__dirname+"/about(2).html");
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});