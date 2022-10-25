const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection
    }
    
    viewAllEmployees(){
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS dept, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;")
    }

    addNewEmployee(newEmployee){
        return this.connection.promise().query("INSERT INTO employee SET ?", newEmployee)
    }

    viewAllDepts(){
        return this.connection.promise().query("SELECT id AS dept_ID, name AS Department FROM department;");
    }

    viewAllRoles(){
        return this.connection.promise().query("SELECT role.id, role.title AS Role, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;")
    }

    

    addDept(newDept){
        return this.connection.promise().query("INSERT INTO department SET ?", newDept)
    }

    addRole(newRole){
        return this.connection.promise().query("INSERT INTO role SET ?", newRole)
    }
}

module.exports = new DB(connection);