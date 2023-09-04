const { Pool } = require("pg");

const pool = new Pool({
  user: "db_user",
  host: "localhost",
  database: "travelplanner",
  password: "example",
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
    release(); // Release the client back to the pool
  }
});

module.exports = pool;
