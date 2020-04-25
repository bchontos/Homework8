const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");
​
​function appMenu() {
    function createManager() {
        console.log("Make your team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What's your manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "Whats your manager's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter number greater than zero.";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What's your manager's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+&\S+\.\S*/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter valid email.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What's your manager's office number?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter number greater than zero"
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "What type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I dont want to add any team members"
                ]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What's your engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "Whats your engineer's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID is taken. Please enter another number";
                        } else {
                            return true;
                        }
                    }
                    return "Please enter a number greater than zero";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What's your engineer's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+&\S+\.\S*/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter valid email.";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What's your engineer's Github name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What's your intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "Whats your intern's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID is taken. Please enter another number";
                        } else {
                            return true;
                        }
                    }
                    return "Please enter a number greater than zero";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What's your intern's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+&\S+\.\S*/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter valid email.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "Where did your intern go to school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers. internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    }

    function buildTeam() {
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    createManager();
}

appMenu();
