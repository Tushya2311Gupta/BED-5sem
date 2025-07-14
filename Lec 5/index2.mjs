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
function buyproduct(product_name) {
    return new Promise((resolve, reject) => {
        // do some asynchronous operation
        let isProduct = product.filter((p) => p.name == product_name)[0];
        if (!isProduct) {
            return reject("product is not available");
        }
        resolve(isProduct.amount);
    });
}
let availableamount=10000000
function deductbankamount(amount,cb){
    return new Promise((resolve, reject) => {
        // do some bank transactions
        if (amount > availableamount) {
            return reject("bank balance is low");
        } else {
            availableamount -= amount;
            console.log(availableamount);
            return resolve("amount deducted");
        }
    });
}

buyproduct("samsung")
    .then((amount) => {
        console.log(amount);
        return deductbankamount(amount);
    })
    .then((message) => {
        console.log(message);
    })
    .catch((err) => {
        console.log(err);
    });
async function domytask(){
    try {
        let amount = await buyproduct("samsung");
        let message = await deductbankamount(amount);
        console.log(message);
    } catch (err) {
        console.log(err);
    }
};
console.log(domytask());
console.log("start");

