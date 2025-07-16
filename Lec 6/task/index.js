// const fs=require('fs');

// let data1=fs.readFile("../demo.txt",function(err,data){
//     if(err) {
//         return console.log(err);
//     }
//     fs.readFile("../demo2.txt",function(err,data2){
//         if(err) {
//             return console.log(err);
//         }
//         fs.writeFile("../demo3.txt",data.toString()+data2.toString(),function(err){
//             if(err) {
//                 return console.log(err);
//             }
//             console.log("File written successfully!");
//         });
//         console.log("File read successfully!");
//         console.log(data2.toString());
//     })
// })

//write data in file using fs module and input data should be taken using terminal 

console.log(process.argv);

