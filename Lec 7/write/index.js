let users=[
    {
        name:"Nitesh",
        age:24,
        address:"delhi"
    },
    {
        name:"ritik",
        age:25,
        address:"faridabad"
    }
]

let users2=[
    {        
        name:"John",
        age:30,
    },
    {
        name:"Doe",
        age:28,
    }
]
const fs = require("fs"); //by default callback API is received when we call fs , 

//if we wanna use promise API , then we needa use 
fs.writeFile("../users.txt",JSON.stringify(users),function(err){
    if(err)console.log(err);
    console.log("users written!!");
})

//json format to work on object - object to readable and vice

fs.writeFile("../users2.txt",JSON.stringify(users2),function(err){
    if(err)console.log(err);
    console.log("users written!!");
})

