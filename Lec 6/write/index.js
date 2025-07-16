const fs = require("fs");

fs.writeFile("../demo.txt","Hello, World!",function(err,data){
    if(err) {
        return console.log(err);
    }
    console.log("File written successfully!");
})
fs.appendFile("../demo.txt","Tushya Gupta is best\n",function(err,data){
    if(err) {
        return console.log(err);
    }
    console.log("File appended successfully!");
})
