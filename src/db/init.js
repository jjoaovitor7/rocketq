const db = require("./config");

const initDb = {
    init() {
        db.exec(`CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY,
            pass TEXT
        );`);

        db.exec(`CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            room INT
        );`);

        db.close();
    },
};

initDb.init();