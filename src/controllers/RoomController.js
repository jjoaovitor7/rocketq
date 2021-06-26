function returnIds(db, queryResult) {
  return new Promise((resolve, reject) => {
    db.query("SELECT r_id FROM rooms;", function (err, data) {
      if (err) {
        reject(err);
      } else {
        let result = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < result.length; i++) {
          queryResult.push(result[i].r_id);
        }
        resolve(queryResult);
      }
    });
  });
}

module.exports = {
  async create(req, res) {
    const db = require("../db/config");
    const pass = req.body.password;
    let roomId;
    let isRoom = true;
    let queryResult = [];

    while (isRoom) {
      // gera número da sala
      for (let i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString());
      }

      // verifica se a sala já existe
      await returnIds(db, queryResult);
      isRoom = queryResult.some((roomExistId) => roomExistId === roomId);
      if (!isRoom) {
        // insere a sala no banco */
        db.query(
          `INSERT INTO rooms (r_id, r_pass) VAlUES ("${parseInt(
            roomId
          )}", "${pass}");`,
          function (err, data) {
            if (err) {
              reject(err);
            }
          }
        );
      } else {
        console.log("A sala já existe.");
      }
    }

    res.redirect(`/room/${roomId}`);
  },

  async open(req, res) {
    const db = require("../db/config");
    const roomId = req.params.room;
    const questions = [];
    const questionsRead = [];
    let isNoQuestions;

    function returnQuestions(questions, questionsRead) {
      let aux = [];
      aux.push(
        new Promise((resolve, reject) => {
          db.query(
            `SELECT * FROM questions WHERE q_room = ${roomId} and q_read = 0;`,
            function (err, data) {
              if (err) {
                reject(err);
              }
              if (data == undefined) {
              } else {
                let result = JSON.parse(JSON.stringify(data));
                for (let i = 0; i < result.length; i++) {
                  questions.push(result[i]);
                }
              }
              resolve(questions);
            }
          );
        })
      );

      aux.push(
        new Promise((resolve, reject) => {
          db.query(
            `SELECT * FROM questions WHERE q_room = ${roomId} and q_read = 1;`,
            function (err, data) {
              if (err) {
                reject(err);
              }

              if (data == undefined) {
              } else {
                let result = JSON.parse(JSON.stringify(data));
                for (let i = 0; i < result.length; i++) {
                  questionsRead.push(result[i]);
                }
              }
              resolve(questionsRead);
            }
          );
        })
      );

      return Promise.all(aux);
    }

    await returnQuestions(questions, questionsRead);
    if (questions.length == 0 && questionsRead.length == 0) {
      isNoQuestions = true;
    }

    res.render("room", {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions,
    });
  },

  async enter(req, res) {
    const db = require("../db/config");
    const roomId = req.body.roomId;
    let queryResult = [];

    await returnIds(db, queryResult);
    if (queryResult.includes(parseInt(req.body.roomId))) {
      res.redirect(`/room/${roomId}`);
    } else {
      res.render("roomnotfound");
    }
  },
};
