const Employee = require("./employee");

class intern extends Employee {
    constructor(name, email, school, id){
        super(name, email, id);
        this.school = school;
    }
    getRole(){
        return "Intern";
    }
    getSchool(){
        return this.school;
    }
}
module.exports = intern;