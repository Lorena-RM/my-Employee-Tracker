const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  viewAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS dept, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
      );
  }

  addNewEmployee(newEmployee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", newEmployee);
  }

  updateEmployee(roleId, employeeId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }

  removeEmployee(employeeId) {
    return this.connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", employeeId);
  }

  viewAllDepts() {
    return this.connection
      .promise()
      .query("SELECT id AS dept_ID, name AS Department FROM department;");
  }

  viewAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title AS Role, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;"
      );
  }

  addDept(newDept) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", newDept);
  }

  addRole(newRole) {
    return this.connection.promise().query("INSERT INTO role SET ?", newRole);
  }

  findAllPossibleManagers(employeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
      );
  }

  updateEmployeeManager(managerId, employeeId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET manager_id = ? WHERE id = ?", [
        managerId,
        employeeId,
      ]);
  }

  removeRole(roleId) {
    return this.connection
      .promise()
      .query("DELETE FROM role WHERE id = ?", roleId);
  }

  removeDept(deptId) {
    return this.connection
      .promise()
      .query("DELETE FROM department WHERE id = ?", deptId);
  }

  viewEmployeesByDept(deptId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        deptId
      );
  }

  viewAllEmployeesbyManager(managerId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
        managerId
      );
  }
}

module.exports = new DB(connection);
