const express = require('express')
var cors = require('cors')
const server = express()

server.use(cors())
server.use(express.json())
server.use(require('./routes'))

module.exports = server
