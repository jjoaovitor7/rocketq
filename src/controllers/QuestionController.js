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
                db.each(`SELECT * FROM rooms WHERE id = ${roomId}`, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    pass.push(data.pass);
                }, () => {
                    resolve(pass);
                });
            });
        }

        await returnPass(pass);

        if (pass[0] == password) {
            if (action == "delete") {
                db.exec(`DELETE FROM questions WHERE id = ${questionId}`);
            } else if (action == "check") {
                db.exec(`UPDATE questions SET read = 1 WHERE id = ${questionId}`);
            }
            res.redirect(`/room/${roomId}`);
        } else {
            res.render('passincorrect', { roomId: roomId });
        }
    },

    create(req, res) {
        const db = require("../db/config");
        const question = req.body.question;
        const roomId = req.params.room;

        db.exec(`INSERT INTO questions(title, room, read) VALUES ( "${question}", ${roomId}, 0);`);
        res.redirect(`/room/${roomId}`);
    }
}