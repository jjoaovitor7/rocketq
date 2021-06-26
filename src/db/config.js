const sqlite3 = require("sqlite3");
module.exports = new sqlite3.Database("./src/db/rocketq.sqlite");