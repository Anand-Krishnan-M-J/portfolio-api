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
  image VARCHAR(255) NOT NULL,
  title VARCHAR(400) NOT NULL,
  shortDescription VARCHAR(800) NOT NULL,
  content VARCHAR(255000) NOT NULL,
  isDeleted BOOLEAN DEFAULT 'false'
);
INSERT INTO blogs (title, date, shortDescription , content, image )
VALUES  (
'Breaking Changes in React 18',

 '2022-06-21',

 'What would a major release be without a breaking change? Well, this version 
 of React is a bit different, and you will see why in a second. One of the 
 changes you can make is to alter render to createRoot like so:', 

 'createRoot enables concurrent features from React 18. If you dont use it, 
 your app will behave like its on React 17, and you wont get to experience 
 sweet out-of-the-box optimization. So for now, you will see a deprecation 
 notice if you are still using render instead of createRoot. This is a good 
 chance to experiment and see if the new concurrent features improve your 
 production performance. You can run an experiment where one variant has 
 render and the other uses createRoot. Also, you wont break your code by 
 switching to the new API. You can gradually switch to createRoot without 
 the possibility of breaking your app.',

 'https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?ixlib=rb-1.2.1
 &ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwzOTU0NTB8fGVufDB8fHx8&w=1000&q=80' );
