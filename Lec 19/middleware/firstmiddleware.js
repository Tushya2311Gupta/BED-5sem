function m1(req, res, next){
    console.log("Middleware 1");
    req.userid="1";
    next()
}
function m2(req, res, next){
    console.log("Middleware 2");
    console.log(req.userid);
    req.isAdmin = true;
    next();
}

function m3(req, res, next){
    console.log("Middleware 3");
    console.log(req.userid);
    console.log(req.isAdmin);
    next();
}

module.exports.m1=m1;
module.exports.m2=m2;
module.exports.m3=m3;