-- Create a file for initializing 
-- the table with an entry. We'll use this for the Heroku database.
-- For Heroku
-- Run: cat db/create-tables.sql | heroku pg:psql postgresql-shaped-78699 --app my-portfolio-node-api

CREATE TABLE blogs (
  ID SERIAL PRIMARY KEY,
  date VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  title VARCHAR(400) NOT NULL,
  shortDescription VARCHAR(800) NOT NULL,
  content VARCHAR(255000) NOT NULL
);

INSERT INTO blogs (date, image, title, shortDescription,content )
VALUES  ('June 14', 
'https://wall.alphacoders.com/tag/4k-black-&-white-wallpapers',
 'Localstack',
 'shortDescription shortDescription shortDescription', 
 'content content contentcontent content content content' );