DROP DATABASE IF EXISTS pantry_db ;

CREATE DATABASE pantry_db;

CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT,
  burger_name  VARCHAR(30),
  devoured BOOLEAN NOT NULL,
   PRIMARY KEY (id)
);
SELECT * FROM burgers;