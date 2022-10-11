//const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
//const db = require("./db");
//require("console.table");

init();

function init() {
    const logoText = logo({
        name: 'Employee Tracker',
        font: 'ANSI Shadow',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'bold-cyan',
        textColor: 'blue',
    })
    .emptyLine()
    .right('Developed by: Lorena Morales')
    .right('version 1.0.0')
    .render()
 
    console.log(logoText);
  
    //loadMainUserOptions();
}

