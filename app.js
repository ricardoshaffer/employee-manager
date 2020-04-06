const Manager = require("./apps/manager");
const Engineer = require("./apps/engineer");
const Intern = require("./apps/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "/index.html");
const render = require("./apps/htmlRenderer");
let employees = []
const employeeData = [
    {
        type: `input`,
        message: `what's employee's name?`,
        name: `name`,
        validate: function validatename(name){
            return name !== '';
        }
    },
    {
        type: `input`,
        message: `what's employee's ID?`,
        name: `id`,
        validate: function validateNumber(id)
        {
           var reg = new RegExp(/^\d+$/);
           return reg.test(id) || "Employee ID should be a number!";
        }
    },
    {
        type: `input`,
        message: `what's employee's e-mail?`,
        name: `email`,
        validate: function validateEmail(email)
        {
           var reg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm);
           return reg.test(email) || "that's not a valid email.";
        }

    },
    {
        type: `list`,
        message: `What's the employee's position?`,
        name: `position`,
        choices: [
        `Intern`,
        `Engineer`,
        `Manager`
        ]
    },
]
const internInfo =  [
    {
        message: `What school did/does the intern attend?`,
        type: `input`,
        name: `education`
    }
]
const engineerInfo =  [
    {
        message: `What's the Engineer's GitHub Account?`,
        type: `input`,
        name: `github`,
        validate: function validateGithub(github){
            return github !== '';
        }
    }
]

const managerInfo =  [
    {
        message: `What's the manager's office number?`,
        type: `input`,
        name: `officeNumber`,
        validate: function validateNumber(officeNumber)
        {
           var reg = new RegExp(/^\d+$/);
           return reg.test(officeNumber) || "Hmmm... The phone number should be a phone number!";
        }
    }
]
const addMember =  [
    {
        message: `would you like to add a new team member?`,
        type: `list`,
        name: `newTeam`,
        choices: [
            `Yes`,
            `No`
            ]
    }
]
function employeeDetails() {

    return inquirer.prompt(employeeData).then(answers => {
        let name = answers.name;
        let id = answers.id;
        let email = answers.email;
        let position = answers.position;
        if (position == `Intern`) {
            inquirer.prompt(internInfo).then(internAnswers => {
                let school = internAnswers.education;
                employees.push(new Intern(name, id, email, school));
                inquirer.prompt(addMember).then(addAddt => {
                    let addMember = answers.newTeam;
                    addMember = addAddt.addMember;
                    repeatAddt(addMember);
                })
            }
        )}
        else if (position == `Engineer`) {
            inquirer.prompt(engineerInfo).then(engineerAnswers => {
                let github = engineerAnswers.github;
                employees.push(new Engineer(name, id, email, github));
                inquirer.prompt(addMember).then(addAddt => {
                    let addMember = answers.newTeam;
                    addMember = addAddt.addMember;
                    repeatAddt(addMember);
                })
            }
        )}
        else if (position == `Manager`) {
            inquirer.prompt(managerInfo).then(managerAnswer => {
                let officeNumber = managerAnswer.officeNumber;
                employees.push(new Manager(name, id, email, officeNumber));
                inquirer.prompt(addMember).then(addAddt => {
                    let addMember = answers.newTeam;
                    addMember = addAddt.addMember;
                    repeatAddt(addMember);
                })
            }
        )}

    })
    .catch(error => {
        console.log(error)
    })
}

function repeatAddt(addMember){
    if(addMember == 'Yes')
    {
        employeeDetails();
    }else {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
            console.log("created new output folder");
        }
    fs.writeFileSync(outputPath, render(employees), "utf-8", error => {
        console.log("updated file with new employee information");
    if (error) {
        console.log(error);
    }
});
}
}
employeeDetails();