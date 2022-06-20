-- Create a file for initializing 
-- the table with an entry. We'll use this for the Heroku database.
-- For Heroku
-- Run: cat db/create-tables.sql | heroku pg:psql postgresql-shaped-78699 --app my-portfolio-node-api

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  age VARCHAR(255) NOT NULL,
  email VARCHAR(400) NOT NULL,
  password VARCHAR(800) NOT NULL
);

INSERT INTO users (username, age, email, password )
VALUES  (
'Anand',
 '56',
 'anandkrish0646@gmail.com', 
 '$2b$10$HR6l.7eHCCwALm1JJXPmPe43NUNidCR8Ff1ESoOLDV6fAAOon8ide' );

 