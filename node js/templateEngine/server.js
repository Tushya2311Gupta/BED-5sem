// const express = require("express");
// const app = express();
// app.use(express.urlencoded({extended:true}))
// let usersData=[]
// app.get("/adduser",(req,res)=>{
//     res.sendFile(__dirname+"/register.html");
// })
// app.post("/adduser",(req,res)=>{
//     let {name ,email,password}=req.body;
//     // console.log(name,email,password)
//     let newUser={
//         name:name,
//         email:email,
//         password:password,
//     }
//     usersData.push(newUser);
//     res.send(usersData);
// })

// app.listen(5643,()=>{
//     console.log("server started");
// })
// const express= require("express");
// const app= express();
// const mongoose = require('mongoose');
// const User=require("./model/users");
// app.use(express.json())

// app.post("/users",async(req,res)=>{
//   console.log("hello")
//   const{name,email,password}=req.body;
//   let newUser=new User({name:name,email,password:password});
//   await newUser.save();
 
//   res.send("user added succesfully");
// })
// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'))
//   .catch((err)=>console.log(err));
// app.listen(4444,(req,res)=>{
//     console.log("server started")
// })

// const express = require("express");
// const app = express();
// const mongoose = require('mongoose');
// const { User, Blog } = require("./model/users");
// app.use(express.json());
// app.post("/users", async (req, res) => {
//     const { name, email, password } = req.body;
//     let newUser = new User({ name, email, password });
//     await newUser.save();
//     res.send("User added successfully");
// });
// app.post("/blogs", async (req, res) => {
//     const { title, content, author } = req.body;    
//     try {
//         let newBlog = new Blog({ title, content, author });
//         await newBlog.save();
//         res.send("Blog created successfully");
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });
// mongoose.connect('mongodb://127.0.0.1:27017/test')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.log(err));
// app.listen(4444, () => {
//     console.log("Server started on port 4444");
// });
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const {User}=require("./model/users");
const userRouter = require("./Routes/users");
app.use(express.json());

app.use("/users", userRouter);   // specified path and then userRouter which helps in getting the base path.since it is written in app.use so by default it will run for every req but by specifying path it will run for that base path only.  
app.set("view engine", 'hbs');  // stating template engine.


app.get("/",(req,res)=>{
  res.render("home")
})

// app.post("/users",async(req,res)=>{
//     const {name,email,password}=req.body;
//     let newUser = new User({name:name,email:email,password:password});
//     await newUser.save();
//     res.send("user added successfully")
// })

    

    // app.get("/users/:id",async(req, res)=>{
    //     let {id} = req.params;
    //     let user = await User.findById(id);
    //     res.send(user);
    // });
    // app.delete("/users/:id", async(req, res)=>{
    //     let{id} = req.params;
    //     await User.deleteOne({_id:id});
    //     res.send("User deleted");

    // });
    // app.get("/users", async(req, res)=>{
    //     let allusers = await User.find();
    //     res.send(allusers);
    // });
    // app.put("/users/:id", async (req, res)=>{
    //     let {id} = req.params;
    //     let updateUser= await User.findById(id);
    //     let {name, email, password} = req.body;
    //     updateUser.name = name;
    //     updateUser.email = email;
    //     updateUser.password = password;
    //     await updateUser.save();
    //     res.send("User updated");
    // })

  // server side rendering
    app.get("/", (req, res)=>{
      res.render("home");
    });

    // sending data and 
    app.get("/userpage", (req, res)=>{
      res.render("users", {
        name: "Vivek",
        age:23,
        followers:["a","b","c"],
        posts:[{id:1, caption:"shgfsudgfd", imageURL:"https://th.bing.com/th/id/OIP.Y64zo6idinAtdWb-NOktKQHaHa?rs=1&pid=ImgDetMain"},{id:2, caption:"fdsgfsdu", imageURL:"https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?rs=1&pid=ImgDetMain"}]
      });
    });

    
mongoose.connect('mongodb://127.0.0.1:27017/g26mondb')
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err));
  
app.listen(4000, (req,res) => {
    console.log("Server started");
})