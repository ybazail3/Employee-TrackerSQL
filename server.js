// Depedencies
const inquirer = require('inquirer');
const mysql = require('mysql12');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});
connection.connect
userChoice();

const userChoice = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'prompt',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department'],
        },
    ]).then(answers => {
        switch (answers.type) {
            case 'View All Employees':
                viewEmployees();
                Break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departmentsd':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            default:
                finishedUpdating();

        }
    }
    )
};

const viewEmployees = () => {
    connection.query(`SELECT id, first_name, last_name, role_id, manager_id FROM company_db`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        userChoice();
    });
};

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Employees First Name',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'Enter Employees Last Name',
            name: 'lastName',
        },
        {
            type: 'input',
            message: 'Enter Employees Role',
            name: 'employeeRole',
        },
        {
            type: 'input',
            message: 'Enter Employees Manager',
            name: 'manager',
        },
    ]).then((answers) => {
        connection.query(`INSERT INTO employee SET ?`,
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.employeeRole,
                manager_id: answers.manager
            }
        ), cTable(answers);
        userChoice();
    });
};

const updateEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Employees ID',
            name: 'employeeId',
        },
        {
            type: 'input',
            message: 'Enter Employees New Role',
            name: 'newRole',
        },
    ]).then((answers) => {
        connection.query(`UPDATE employee SET WHERE ?`, {
                role_id: answers.newRole
            }
        ), cTable(answers);
        userChoice();
    });
};

const viewRoles = () => {
    connection.query(`SELECT id, title, salary FROM company_db`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        userChoice();
    });
};

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Name of Role',
            name: 'roleName',
        },
        {
            type: 'input',
            message: 'Enter this Roles Salary',
            name: 'salary',
        },
        {
            type: 'input',
            message: 'Enter Department of this Role',
            name: 'department',
        },
    ]).then((answers) => {
        connection.query(`INSERT INTO roles (title, salary, department_name )
        VALUES (${answers.roleName}, ${answers.salary}, ${answers.department})`, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log(results);
            userChoice();
        });
    });
};

const viewDepartments = () => {
    connection.query(`SELECT id, department_name FROM company_db`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
        userChoice();
    });
};

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the Department',
            name: 'departmentName',
        },
    ]).then((answers) => {
        connection.query(`INSERT INTO department SET ?`,
        {
         department_name: answers.departmentName  
        }
        ), cTable(answers)
            userChoice();
        });
    };

const finishedUpdating = () => {
    console.log('Finished Updating!');
    process.exit();
};