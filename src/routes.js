const express = require('express')
const routes = express.Router()

const preferenciasController = require('./app/Controller/TecnologiasController')
const meetupController = require('./app/Controller/MeetupController')
const UsuariosController = require('./app/Controller/UsuariosController')

routes.get('/', (req, res) => {
  console.log('chegou')
  res.send('tudo ok')
})

// ---- TECNOLOGIAS
routes.post('/tecnologias', preferenciasController.create)
routes.put('/tecnologias/:id', preferenciasController.update)
routes.delete('/tecnologias/:id', preferenciasController.delete)

// ---- MEETUPS
routes.post('/meetup', meetupController.create)
routes.put('/meetup/:id', meetupController.update)
routes.delete('/meetup/:id', meetupController.delete)

// ---- USUARIOS
routes.post('/usuarios', UsuariosController.create)
routes.put('/usuarios/:id', UsuariosController.update)
routes.delete('/usuarios/:id', UsuariosController.delete)
routes.get('/usuarios/:id', UsuariosController.show)
// ---- INSCRIÇÃO
// routes.post('/inscricao', UsuariosController.inscricao)

// ---- DASHBORDS

module.exports = routes
