// Use the node-postgres package to create a Pool, 
// which will be used to make queries to the database.

// Create a connection string that follows the pattern
//  of postgresql://USER:PASSWORD@HOST:PORT/DATABASE. 
//  I'll use the environment variables from 
//  .env using process.env.VARIABLE. Initializing
//   with require('dotenv').config()
//    will allow you to use those environment variables.

// I've also created an isProduction 
// string - in an environment like Heroku, 
// NODE_ENV will be set to production so you can have different behavior 
// between environments. Heroku will supply us with a string called
//  DATABASE_URL for the connectionString, so we won't have to build a new one.
require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction?{ rejectUnauthorized: false } : false,
})
console.log(process.env.DATABASE_URL,isProduction, "url")
module.exports = { pool }