// Depedencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const connection = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    },
    console.log(` 
                ------------------------------------------

                            ~ EMPLOYEE MANAGER ~
            
                ------------------------------------------`)
);

// const selectManager = () => {
//         return inquirer.prompt([
//             {
//                 type: 'list',
//                 message: 'Choose a manager',
//                 name: 'prompt',
//                 choices: [
//                     connection.query(`SELECT manager FROM employee`, () => {

//                      })
//                 ]
//             }
//         ]);
//     };

// const selectRole = () => {
//     return inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Choose a role',
//             name: 'prompt',
//             choices: [
//                 connection.query(`SELECT role_id FROM employee`, (err, results) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                     console.
//                  })
//             ]
//         }
//     ]);
// };

const showRoles = () => {
    connection.query('SELECT id, title FROM roles', (err, results) => {
        if (err) {
            console.log(err);
        };
        console.table(results);
    })
};

const showDepartments = () => {
    connection.query('SELECT id, department_name FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
    })
};

const userChoice = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "prompt",
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Update Employee Role",
                    "Delete Employee",
                    "View All Roles",
                    "Add Role",
                    "Delete Role",
                    "View All Departments",
                    "Add Department",
                    "Delete Department",
                    "View Department Budget",
                ],
            },
        ])
        .then((answers) => {
            switch (answers.prompt) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "Delete Employee":
                    deleteEmployee();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Delete Role":
                    deleteRole();
                    break;
                case "View All Departments":
                    viewDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Delete Department":
                    deleteDepartment();
                    break;
                case "View Department Budget":
                    departmentBudget();
                    break;
                default:
                case "Finished Updating":
                    finishedUpdating();
            }
        });
};

const viewEmployees = () => {
    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, roles.title, 
        department.department_name, roles.salary, employee.manager_id 
        FROM ((employee LEFT JOIN roles ON employee.role_id = roles.id) 
        LEFT JOIN department on roles.department_id = department.id);
        `,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            userChoice();
        }
    );
};

const addEmployee = () => {
    showRoles();
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter Employees First Name",
                name: "firstName",
            },
            {
                type: "input",
                message: "Enter Employees Last Name",
                name: "lastName",
            },
            {
                type: "input",
                message: "Enter Employees Role ID",
                name: "employeeID",
            },
            {
                type: "input",
                message: "Enter Employees Manager ID",
                name: "managerID",
            },
        ])
        .then((answers) => {
            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
        ('${answers.firstName}', '${answers.lastName}', '${answers.employeeID}', '${answers.managerID}')`),
                console.table(answers);
            userChoice();
        });
};

const updateEmployee = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter Employees ID",
                name: "employeeId",
            },
            {
                type: "input",
                message: "Enter Employees New Role ID",
                name: "newRoleId",
            },
        ])
        .then((answers) => {
            connection.query(
                `UPDATE employee SET role_id = ${answers.newRoleId} WHERE id = ${answers.employeeId}`
            ),
                console.table(answers);
            userChoice();
        });
};

const deleteEmployee = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter Employee",
                name: "employee",
            },
        ]).then((answers) => {
            connection.query(
                `DELETE FROM employee WHERE id='${answers.employee}'`
            ),
                console.table(answers);
            userChoice();
        })
};

const viewRoles = () => {
    connection.query(
        `SELECT roles.id, roles.title, department.department_name, roles.salary FROM roles LEFT JOIN department ON roles.department_id = department.id`,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            userChoice();
        }
    );
};

const addRole = () => {
    showDepartments();
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter Name of Role",
                name: "roleName",
            },
            {
                type: "input",
                message: "Enter this Roles Salary",
                name: "salary",
            },
            {
                type: "input",
                message: "Enter Department ID of this Role",
                name: "department",
            },
        ])
        .then((answers) => {
            connection.query(`INSERT INTO roles(title, salary, department_id) VALUES 
        ('${answers.roleName}', '${answers.salary}', '${answers.department}')`),
                console.table(answers);
            userChoice();
        });
};

const deleteRole = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter Role ID",
                name: "role",
            },
        ]).then((answers) => {
            connection.query(
                `DELETE FROM roles WHERE id='${answers.role}'`
            ),
                console.table(answers);
            userChoice();
        })
};

const viewDepartments = () => {
    connection.query(
        `SELECT id, department_name FROM department`,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            userChoice();
        }
    );
};

const addDepartment = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the name of the Department",
                name: "departmentName",
            },
        ])
        .then((answers) => {
            connection.query(
                `INSERT INTO department(department_name) VALUES ('${answers.departmentName}')`
            ),
                console.table(answers);
            userChoice();
        });
};

const deleteDepartment = () => {
    console.log('Calling delete department')
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Enter Department",
                name: "department",
            },
        ]).then((answers) => {
            connection.query(
                `DELETE FROM department WHERE department_name='${answers.department}'`,
                (err, results) => {
                    if (err) {
                        console.log(err);
                    }

                    console.table(answers, results);
                    userChoice();
                })
        })
};

const departmentBudget = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter Department ID',
                name: 'departmentID',
            },
        ]).then((answers) => {
            connection.query(
                `SELECT SUM(salary) FROM roles WHERE department_id=${answers.departmentID}`,
                (err, results) => {
                    if (err) {
                        console.log(err);
                    }

                    console.table(answers, results);
                    userChoice();
                })
        })
};


const finishedUpdating = () => {
    console.log("Finished Updating!");
    process.exit();
};

userChoice();
