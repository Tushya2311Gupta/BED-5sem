function read(filepath){
    return new Promise((resolve, reject) => {
    fs.readFile("../users.txt","utf-8",function(err,data){
        if(err)console.log(err);
        console.log(JSON.parse(data)[0]);
        console.log(JSON.parse(data)[1].address);
        resolve();
    })
   })
}