const { Pool } = require("pg");

const pool = new Pool({
  user: "db_user",
  host: "localhost",
  database: "travelplanner",
  password: "example",
  port: 5432,
});

module.exports = pool;
