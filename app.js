const Manager = require("./apps/manager");
const Engineer = require("./apps/engineer");
const Intern = require("./apps/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
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
        validate: function validateemail(name){
            return name !== '';
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

function employeeDetails() {

    return inquirer.prompt(employeeData).then(answers => {
        let name = answers.name;
        let id = answers.id;
        let email = answers.email;
        let position = answers.position
        if (position == `Intern`) {
            inquirer.prompt(internInfo).then(internAnswers => {
                let school = internAnswers.education;
                employees.push(new Manager(name, id, email, school));
            }
        )}
        else if (position == `Engineer`) {
            inquirer.prompt(engineerInfo).then(engineerAnswers => {
                let github = engineerAnswers.github;
                employees.push(new Manager(name, id, email, github));
            }
        )}
        else if (position == `Manager`) {
            inquirer.prompt(managerInfo).then(managerAnswer => {
                let officeNumber = managerAnswer.officeNumber;
                employees.push(new Manager(name, id, email, officeNumber));
            }
        )}
    })
    .catch(error => {
        console.log(error)
    })
}

employeeDetails();

//     inquirer.prompt(employeeData);

// inquirer.get(Intern)    
// .then(answers => {
//     const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
//     teamMembers.push(intern);
//     idArray.push(answers.internId);
//     createTeam();
// });

// //Generate Directory 
// function buildTeam() {
//     if (!fs.existsSync(OUTPUT_DIR)){
//         fs.mkdirSync(OUTPUT_DIR)
//     }
//     ​fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
//     ​}