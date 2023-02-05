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

CREATE TABLE projects (
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

CREATE TABLE email (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(400) NOT NULL,
  message TEXT NOT NULL,
  isDeleted BOOLEAN DEFAULT 'false'
);
