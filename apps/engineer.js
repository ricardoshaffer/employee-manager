const Employee = require("./employee");
class engineer extends Employee {
    constructor(name, email, github, id){
        super(name, email, id);
        this.github = github;
    }
    getRole(){
        return "Engineer";
    }
    getGithub(){
        return this.github;
    }
}
module.exports = engineer;