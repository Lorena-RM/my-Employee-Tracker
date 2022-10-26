<h1 align="center"> <a href="#">
My Employee Tracker 📝</a>
</h1>

<p align="center">This Project has no front end but cooperates and functions with MYSQL. using our console and other packages we can create a database that stores departments, Managers, and Employees!</p>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Resources](#resources)
- [Tests](#tests)
- [Questions](#questions)

## [License](table-of-contents)
### My project is under the following Licenses:
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## [Description](#table-of-contents)
This application creates a database that can keep track of departments, managers and employees inside the database. With all of our packagaes needed to run this application we can view, create, and remove departments, managers and employees as well as update employee information and view other information of these departments.

### User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

### Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## [Installation](#table-of-contents)
This application requires that you download the following packages using Node to run this application:

<p align="center">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> 
<p align="center">
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"> 
<p align="center">
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">
<p align="center">
<img src="https://img.shields.io/badge/MySQL2-005C84?style=for-the-badge&logo=mysql&logoColor=white">
<p align="center">
<img src= "https://img.shields.io/badge/npm-asciiart-logo?style=for-the-badge&logo=npm&logoColor=white">
<p align="center">
<img src= "https://img.shields.io/badge/npm-inquirer-npm?style=for-the-badge&logo=npm&logoColor=blue">
<p align="center">
<img src= "https://img.shields.io/badge/npm-console.table-npm?style=for-the-badge&logo=npm&logoColor=white">

The NPM packages are on the package.json for you to simply run this command in your terminal:

```
npm i
```
once I have done that in order to run the application with Data already in the application i must first create my database and seed it with the sql files inside the DB folder

Below is a short GIF to help you understand exact steps for installation for a smooth application run:

![gif example](./assets/images/installation.gif)

once sql files have been sourced in MYSQL run the following command in your terminal

```
npm start
```
![npm Start example](./assets/images/npmstart.gif)
> Refer to the GIF above for visual instruction

## [Usage](#table-of-contents)
There are various options to choose from as soon as we run the application, for a run through on these options, I created an array of GIFs to view these options in action!

### Employee functions
we have various Employee options where we can view, create, update and delete employees!

![employeefunctions](./assets/images/employeeFunctions.gif)

### Role Functions
For the Roles in our database, we are able to view, create and assign roles to a department, and delete roles in our system

![rolefunctions](./assets/images/roleFunctions.gif)

### Department Functions
For the Departments in our database, we can view exsisting departments, create new Deptartments and delete Departments.




## [Resources](#table-of-contents)
## [Tests](#table-of-contents)
## [Questions](#table-of-contents)