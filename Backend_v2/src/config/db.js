const { Pool } = require("pg"); //import pool class from the pg library. the Pool class represents a pool of database connections that can be reused, which is a common pattern for database access in Node.js applications

//creates a new PostgreSQl connection pool using Pool class
const pool = new Pool({
  user: "db_user",
  host: "localhost",
  database: "travelplanner",
  password: "example",
  port: 5432,
});

//establish database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
    release(); //release the database client back to the pool so it can be reused for other database operations (will prevent potential issues like running out of available connections in the pool)
  }
});

module.exports = pool;
