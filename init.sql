-- Create a file for initializing 
-- the table with an entry. We'll use this for the Heroku database.
-- For Heroku
-- login to heroku
-- Run: cat init.sql | heroku pg:psql postgresql-shaped-78699 --app my-portfolio-node-api

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  age VARCHAR(255) NOT NULL,
  email VARCHAR(400) NOT NULL,
  password VARCHAR(800) NOT NULL,
  isDeleted BOOLEAN DEFAULT '0'
);

INSERT INTO users (username, age, email, password )
VALUES  (
'Anand',
 '56',
 'anandkrish0646@gmail.com', 
 '$2b$10$HR6l.7eHCCwALm1JJXPmPe43NUNidCR8Ff1ESoOLDV6fAAOon8ide' );

CREATE TABLE blogs (
  ID SERIAL PRIMARY KEY,
  date VARCHAR(255) NOT NULL,
  image VARCHAR(400) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(800) NOT NULL,
  content TEXT NOT NULL,
  isDeleted BOOLEAN DEFAULT 'false',
  slug TEXT NOT NULL,
  showInPortfolio BOOLEAN NOT NULL
);

