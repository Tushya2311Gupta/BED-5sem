
let users=[
    {
        id:1,
        name:"Tushya",
        age:20
    },
    {
        id:2,
        name:"abc",
        age:16
    }
]

function isAllowed(id){
    return new Promise((resolve, reject) => {
        let user = users.filter(user => user.id == id)[0];
        if (user) {
            if (user.age >= 18) {
                resolve(user.name + " is eligible to vote.");
            } else {
                reject(user.name + " is not eligible to vote.");
            }
        } else {
            reject("User not found.");
        }
    });
}

isAllowed(1).then((data)=> {
    console.log(data);
}).catch((err) => {
    console.log(err);
});

isAllowed(2).then((data)=> {
    console.log(data);
}).catch((err) => {
    console.log(err);
}); 
