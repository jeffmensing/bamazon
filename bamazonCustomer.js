var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt");
var colors = require('colors/safe');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

function displayInventory() {
    //connect to the mysql database and pull the information from the Products database to display to the user
    connection.query('select item_id, product_name, price from products', function(err, result) {
        if (err) console.log(err);
        //creates a table for the information from the mysql database to be placed
        var table = new Table({
            head: ['Item#', 'Product Name', 'Price'],
            style: {
                head: ['blue'],
                compact: false,
                colAligns: ['center'],
            }
        });
        //loops through each item in the mysql database and pushes that information into a new row in the table
        for (var i = 0; i < result.length; i++) {
            table.push(
                [result[i].item_id, result[i].product_name, result[i].price]
            );
        }
        console.log(table.toString());
    });
}

function purchas() {

}

displayInventory();
