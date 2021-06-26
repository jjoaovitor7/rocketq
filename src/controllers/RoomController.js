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
                i == 0 ?
                    (roomId = Math.floor(Math.random() * 10).toString()) :
                    (roomId += Math.floor(Math.random() * 10).toString());
            }

            // verifica se a sala já existe
            function returnIds(queryResult) {
                return new Promise((resolve, reject) => {
                    db.each("SELECT id FROM rooms;", (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        queryResult.push(data.id);
                    }, () => {
                        resolve(queryResult);
                    });
                });
            }

            await returnIds(queryResult);
            isRoom = queryResult.some((roomExistId) => roomExistId === roomId);
            if (!isRoom) {
                // insere a sala no banco */
                db.exec(`INSERT INTO rooms (id, pass) VAlUES ("${parseInt(roomId)}", "${pass}");`);
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
            aux.push(new Promise((resolve, reject) => {
                db.each(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    questions.push(data);
                }, () => {
                    resolve(questions);
                })
            }));

            aux.push(new Promise((resolve, reject) => {
                db.each(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    questionsRead.push(data);
                }, () => {
                    resolve(questions);
                })
            }));

            return Promise.all(aux);
        };

        await returnQuestions(questions, questionsRead);
        if (questions.length == 0 && questionsRead.length == 0) {
            isNoQuestions = true;
        }

        res.render("room", { roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions });
    },

    async enter(req, res) {
        const db = require("../db/config");
        const roomId = req.body.roomId;
        let queryResult = [];

        function returnIds(queryResult) {
            return new Promise((resolve, reject) => {
                db.each("SELECT id FROM rooms;", (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    queryResult.push(data.id);
                }, () => {
                    resolve(queryResult);
                });
            });
        }

        await returnIds(queryResult);
        if (queryResult.includes(parseInt(req.body.roomId))) {
            res.redirect(`/room/${roomId}`);
        } else {
            res.render('roomnotfound');
        }
    }
};