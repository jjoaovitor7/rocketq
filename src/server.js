const express = require('express')
const route = require('./route')
const path = require('path')
const server = express()
const PORT = 3000;

server.set('view engine', 'ejs')
server.use(express.static("public"))
server.set('views', path.join(__dirname, 'views'))
server.use(express.urlencoded({ extended: true }))
server.use(route)
server.listen(PORT, () => console.log(`O servidor está rodando em 127.0.0.1:${PORT}`))