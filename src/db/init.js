const db = require("./config");

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    db.query(
      "CREATE TABLE IF NOT EXISTS rooms (r_id INTEGER PRIMARY KEY, r_pass TEXT);",
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('Tabela "rooms" criada ou já existe no Banco de Dados.');
        }
      }
    );

    db.query(
      "CREATE TABLE IF NOT EXISTS questions (q_id INTEGER PRIMARY KEY AUTO_INCREMENT, q_title TEXT, q_read INTEGER, q_room INTEGER);",
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(
            'Tabela "questions" criada ou já existe no Banco de Dados.'
          );
        }
      }
    );

    db.end(function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
});
