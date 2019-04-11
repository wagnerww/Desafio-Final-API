const express = require('express')
const path = require('path')
var cors = require('cors')
const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use('/files', express.static(path.resolve(__dirname, 'tmp', 'uploads')))
server.use(require('./routes'))

module.exports = server
