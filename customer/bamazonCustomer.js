//Bamazon

var mysql = require("mysql");
var inquirer = require("inquirer");
// connect to Data
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Maxpack123",
  database: "bamazon_DB"
});


function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'non-zero number.';
  }
}

//inquirer
function startPurchase() {

  inquirer.prompt([
    {
      type: 'input',
      name: 'item',
      message: 'Which item would you like to purchase.',
      validate: validateInput,
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many do you need?',
      validate: validateInput,
      filter: Number
    }
  ]).then(function(input) {
  

    var item = input.item_id;
    var quantity = input.quantity;

   
    var queryStr = 'SELECT * FROM products WHERE ?';

    connection.query(queryStr, {item_id: item}, function(err, data) {
      if (err) throw err;

    

      if (data.length === 0) {
        console.log('ERROR: Invalid Item . Please select a valid Item ID.');
        displayInventory();

      } else {
        var productData = data[0];

    
        if (quantity <= productData.stock_quantity) {
          console.log('The product is in the stock!');

       
          var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
         
          connection.query(updateQueryStr, function(err, data) {
            if (err) throw err;

            console.log('Your oder is been processing $' + productData.price * quantity);
            console.log('Thank You!');
            console.log("\n--------------\n");

            connection.end();
          })
        } else {
          console.log('Insufficient quantity!');
          console.log('Please change your order');
          console.log("\n-----------\n");

          displayInventory();
        }
      }
    })
  })
}


function displayInventory() {
  

  queryStr = 'SELECT * FROM products';

  connection.query(queryStr, function(err, data) {
    if (err) throw err;
    

    console.log('Existing Inventory: ');
    console.log('....\n');

    var strOut = '';
    for (var i = 0; i < data.length; i++) {
      strOut = '';
      strOut += 'Item : ' + data[i].item_id + '  //  ';
      strOut += 'Product: ' + data[i].product_name + '  //  ';
      strOut += 'Department: ' + data[i].department_name + '  //  ';
      strOut += 'Price: $' + data[i].price + '\n';

      console.log(strOut);
    }

      console.log("--------------\n");

      startPurchase();
  })
}

function runBamazon() {
  
  
  displayInventory();
}

runBamazon();