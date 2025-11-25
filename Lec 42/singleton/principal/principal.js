class Principal{
    multipleSchool=new Map();
    _principal=null;
    _constructor(name){//private constructor
        this.principal=name;

    }
    static getPrincipal(){
        if(!multipleSchool.has(school)){
            let principal=new Principal();
            multipleSchool.set(school,principal);
            // instance=principal;
        }
        return multipleSchool.get(school);
    } 
    createCurriculam(){

    }
    resticateStudents(){

    }
    suspendStudent(days){

    }
    notify(message){

    }
}
module.exports=Principal;