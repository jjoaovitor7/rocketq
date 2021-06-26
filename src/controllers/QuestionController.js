module.exports = {
  async index(req, res) {
    const db = require("../db/config");
    const roomId = req.params.room;
    const questionId = req.params.question;
    const action = req.params.action;
    const password = req.body.password;
    let pass = [];

    // verifica se a senha está correta
    function returnPass(pass) {
      return new Promise((resolve, reject) => {
        db.query(
          `SELECT * FROM rooms WHERE r_id = ${roomId}`,
          function (err, data) {
            if (err) {
              reject(err);
            }
            let result = JSON.parse(JSON.stringify(data));
            pass.push(result[0].r_pass);
            resolve(pass);
          }
        );
      });
    }

    await returnPass(pass);

    if (pass[0] == password) {
      if (action == "delete") {
        db.query(
          `DELETE FROM questions WHERE q_id = ${questionId}`,
          function (err, data) {
            if (err) {
              reject(err);
            }
          }
        );
      } else if (action == "check") {
        db.query(
          `UPDATE questions SET q_read = 1 WHERE q_id = ${questionId}`,
          function (err, data) {
            if (err) {
              reject(err);
            }
          }
        );
      }
      res.redirect(`/room/${roomId}`);
    } else {
      res.render("passincorrect", { roomId: roomId });
    }
  },

  create(req, res) {
    const db = require("../db/config");
    const question = req.body.question;
    const roomId = req.params.room;

    db.query(
      `INSERT INTO questions(q_title, q_room, q_read) VALUES ( "${question}", ${roomId}, 0);`,
      function (err, data) {
        if (err) {
          reject(err);
        }
      }
    );
    res.redirect(`/room/${roomId}`);
  },
};
