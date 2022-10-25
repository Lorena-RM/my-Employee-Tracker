const { prompt, default: inquirer } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

function init() {
  const logoText = logo({
    name: "Employee Tracker",
    font: "ANSI Shadow",
    lineChars: 10,
    padding: 2,
    margin: 3,
    borderColor: "grey",
    logoColor: "bold-cyan",
    textColor: "blue",
  })
    .emptyLine()
    .right("Developed by: Lorena Morales")
    .right("version 1.0.0")
    .render();

  console.log(logoText);

  loadMainUserOptions();
}

function loadMainUserOptions() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View Total Utilized Budget By Department",
          value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    // switch statement depending on what the user choice in main prompts
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
        break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
        break;
      case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
      case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewUtilizedBudgetByDepartment();
        break;
      default:
        quit();
    }
  });
}

function viewEmployees() {
  db.viewAllEmployees().then(([employees]) => {
    console.table(employees);
    loadMainUserOptions();
  });
}

function addEmployee() {
  prompt([
    {
      name: "firstName",
      message: "What is the Employees first name?",
    },
    {
      name: "lastName",
      message: "What is the Employees last name?",
    },
  ]).then((res) => {
    let firstName = res.firstName;
    let lastName = res.lastName;

    db.viewAllRoles().then(([roles]) => {
      const roleChoices = roles.map((role) => {
        return { name: role.Role, value: role.id };
      });
      prompt({
        type: "list",
        name: "roleChoice",
        message: "What is the employee's role?",
        choices: roleChoices,
      }).then((res) => {
        console.log(res);
        const role = res.roleChoice;
        db.viewAllEmployees().then(([employees]) => {
          const managerChoices = employees.map((employee) => {
            return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            };
          });
          managerChoices.push({ name: "No Manager", value: null });

          prompt({
            type: "list",
            name: "managerChoice",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          })
            .then((res) => {
              console.log(res);
              const newEmployee = {
                manager_id: res.managerChoice,
                role_id: role,
                first_name: firstName,
                last_name: lastName,
              };

              db.addNewEmployee(newEmployee);
            })
            .then(() => {
              const logoText = logo({
                name: `Added ${firstName} ${lastName} to the Database`,
                font: "ANSI Shadow",
                lineChars: 10,
                padding: 2,
                margin: 3,
                borderColor: "grey",
                logoColor: "bold-cyan",
                textColor: "blue",
              })
                .emptyLine()
                .right(`congrats on joining the team!`)
                .right("🎉")
                .render();
              console.log(logoText);
            })
            .then(() => loadMainUserOptions());
        });
      });
    });
  });
}

function updateEmployeeRole() {
  db.viewAllEmployees().then(([employees]) => {
    const employeeChoices = employees.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    prompt([
      {
        type: "list",
        name: "employee_Id",
        message: "Which employee role do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      const employeeId = res.employee_Id;
      db.viewAllRoles().then(([roles]) => {
        const roleChoices = roles.map((role) => {
          return { name: role.Role, value: role.id };
        });
        prompt([
          {
            type: "list",
            name: "roleChoice",
            message: "Which new role would you like to assign the selected employee?",
            choices: roleChoices,
          }
        ]).then((res)=>{
          const roleId = res.roleChoice
          db.updateEmployee(roleId, employeeId).then(()=>{
            console.log(`updated the employees role`)
            loadMainUserOptions();
          })
        })
      });
    });
  });
}

function removeEmployee(){
  db.viewAllEmployees().then(([employees]) => {
    const employeeChoices = employees.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    prompt([
      {
        type: "list",
        name: "employee_Id",
        message: "Which employee would you like to remove?",
        choices: employeeChoices,
      },
    ]).then((res)=> {
      db.removeEmployee(res.employee_Id)
    }).then(()=> {
      console.log("This Employee has been removed and no longer exists in the database");
      loadMainUserOptions();
    })
  });
}

function viewRoles() {
  db.viewAllRoles().then(([roles]) => {
    console.table(roles);
    loadMainUserOptions();
  });
}

function addRole() {
  db.viewAllDepts().then(([depts]) => {
    const departmentChoices = depts.map((dept) => {
      return { name: dept.Department, value: dept.dept_ID };
    });
    prompt([
      {
        type: "input",
        name: "title",
        message: "What is the Title of your new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "what is the Salary of this role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "which department would you like to add this role to?",
        choices: departmentChoices,
      },
    ]).then((res) => {
      db.addRole(res).then(() => {
        console.log(`successfully added ${res.title} to roles`);
        loadMainUserOptions();
      });
    });
  });
}

function removeRole() {
  db.viewAllRoles().then(([roles])=>{
    const roleChoices = roles.map((role) => {
      return { name: role.Role, value: role.id };
    });
    prompt([
      {
        type: "list",
        name: "roleChoice",
        message: "Which role would you like to remove?",
        choices: roleChoices,
      }
    ]).then((res)=>{
      db.removeRole(res.roleChoice).then(()=>{
        console.log("role has been removed!")
        loadMainUserOptions();
      })
    })
  })
}

function viewDepartments() {
  db.viewAllDepts().then(([depts]) => {
    console.table(depts);
    loadMainUserOptions();
  });
}

function addDepartment() {
  prompt([
    {
      type: "input",
      name: "name",
      message: "What department would you like to add?",
    },
  ]).then((res) => {
    db.addDept(res).then(() => {
      console.log(`successfully added ${res.name} to departments`);
      loadMainUserOptions();
    });
  });
}

function removeDepartment(){
  db.viewAllDepts().then(([depts]) => {
    const departmentChoices = depts.map((dept) => {
      return { name: dept.Department, value: dept.dept_ID };
    });
    prompt([
      {
        type: "list",
        name: "deptId",
        message: "What department would you like to remove?",
        choices: departmentChoices
      },
    ]).then((res)=>{
      db.removeDept(res.deptId).then(()=> {
        console.log("Department has been removed!")
        loadMainUserOptions();
      })
    })
  });
}

function viewEmployeesByDepartment() {
  db.viewAllDepts().then(([depts]) => {
    const departmentChoices = depts.map((dept) => {
      return { name: dept.Department, value: dept.dept_ID };
    });
    prompt([
      {
        type: "list",
        name: "deptId",
        message: "from What department would you like to see the employees for?",
        choices: departmentChoices
      },
    ]).then((res)=>{
      db.viewEmployeesByDept(res.deptId).then(([employees])=>{
        console.table(employees);
        loadMainUserOptions();
      })
    })
  });
}

function updateEmployeeManager() {
  db.viewAllEmployees().then(([employees]) => {
    const employeeChoices = employees.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    prompt([
      {
        type: "list",
        name: "employee_Id",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices,
      },
    ]).then((res) => {
      const employeeId = res.employee_Id;
      db.findAllPossibleManagers(employeeId)
            .then(([managers]) => {
              const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
              }));
        prompt([
          {
            type: "list",
            name: "managerChoice",
            message: "Which employee do you want to set as manager for the selected employee?",
            choices: managerChoices,
          }
        ]).then((res)=>{
          const managerId = res.managerChoice
          db.updateEmployeeManager(managerId, employeeId).then(()=>{
            console.log(`updated the employees manager!`)
            loadMainUserOptions();
          })
        })
      });
    });
  });
}

function quit() {
  const logoText = logo({
    name: "Goodbye!",
    font: "ANSI Shadow",
    lineChars: 10,
    padding: 2,
    margin: 3,
    borderColor: "grey",
    logoColor: "bold-cyan",
    textColor: "blue",
  })
    .emptyLine()
    .right("Developed by: Lorena Morales")
    .right("version 1.0.0")
    .render();

  console.log(logoText);
  process.exit();
}
