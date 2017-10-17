DROP DATABASE bamazon_DB;

CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item int(11) NOT NULL,
  product VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price VARCHAR(45) NOT NULL,
  stock_quantity INT(11) default 0,
  
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
Values ('Shampoo', 'Cosmetics', 5.75, 500);



