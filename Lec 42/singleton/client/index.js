const Principal=require("../principal/principal");

function suspend(studentName){
    let principal=Principal.getPrincipal();
    Principal.suspendStudent(studentName);
}
function notify(){
    let principal=Principal.getPrincipal();
}