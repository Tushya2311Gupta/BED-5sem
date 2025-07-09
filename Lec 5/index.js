// function buyproduct(product_name,cb){
//     //do some asynchronous operation
//     setTimeout(()=>{
//         //all the operation completed
//         console.log("all the IO operation is completed and order details are written in user data")
//         cb();
//     })
// }

// buyproduct("Iphone 15",function(){
//     console.log("product is purchased")
// })
let product=[{
    name:"samsung",
    amount:70000,
    quantity:10
},
{
    name:"iPhone 16",
    amount:100000,
    quantity:0
}
]
function buyproduct(product_name,cb){
    //do some asynchronous operation
    let isProduct=product.filter((p)=>p.name==product_name)[0]
    if(!isProduct){
        return cb("product is not available",null)
    }
    cb(null,isProduct.amount)
}
let availableamount=10000000
function deductbankamount(amount,cb){
    ///do some bank transactions
    if(amount>availableamount){
        return cb("bank balance is low",null)
    }else{
        availableamount-=amount
        console.log(availableamount)
        cb(null,"amount deducted")
        cb(null,"amount deducted")
        
    }
}

buyproduct("samsung",function(err,amount){
    if(err) return console.log(err)
    console.log(amount);
    deductbankamount(amount,function(err,message){
        if(err) return console.log(err)
            console.log(message)
    })
})

const fs=require("fs")

fs.readFile("filepath","utf-8",(err,data)=>{

})