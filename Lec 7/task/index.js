const fs=require("fs"); 
fs.readFile("../users.txt","utf-8",function(err,data){
    if(err) return console.log(err);
    console.log(JSON.parse(data)[0]);
    console.log(JSON.parse(data)[1].age);
    fs.readFile("../users2.txt","utf-8",function(err,data2){
        if(err) return console.log(err);
        console.log(JSON.parse(data2)[0]);
        console.log(JSON.parse(data2)[1].age);
        const users1 = JSON.parse(data);
        const users2 = JSON.parse(data2);
        const combined = users1.concat(users2);
        fs.writeFile("../users3.txt", JSON.stringify(combined, null, 2), function(err){
            if(err) console.log(err);
            else console.log("users3 written!!");
        });
    });
});