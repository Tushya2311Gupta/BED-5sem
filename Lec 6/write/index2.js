const fs = require("fs");

fs.writeFile("../demo2.txt","Hello, World!",function(err,data){
    if(err) {
        return console.log(err);
    }
    console.log("File written successfully!");
})
fs.appendFile("../demo2.txt","abc is best\n",function(err,data){
    if(err) {
        return console.log(err);
    }
    console.log("File appended successfully!");
})
