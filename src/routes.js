const express = require('express')
const routes = express.Router()
const multerConfig = require('./config/muter')
const upload = require('multer')(multerConfig)

// ---- VALIDATORS
const usuarioValidator = require('./app/validators/usuario')
const meetupValidator = require('./app/validators/meetup')

// ---- MIDDLEWARES
const authMiddleware = require('./app/middlewares/auth')
const validators = require('./app/middlewares/validators')

// ---- CONTROLERS
const preferenciasController = require('./app/Controller/TecnologiasController')
const meetupController = require('./app/Controller/MeetupController')
const UsuariosController = require('./app/Controller/UsuariosController')
const RegisterController = require('./app/Controller/RegisterController')
const DashboardController = require('./app/Controller/DashboardController')
const SessionController = require('./app/Controller/SessionController')

const baseAPISecurity = 'app'

// ---- Autenticaçào
routes.use(`/${baseAPISecurity}`, authMiddleware)

// ---- ROTAS ABERTAS ---- \\
// ---- USUARIO
routes.post(
  `/usuarios`,
  validators(usuarioValidator.usuario),
  UsuariosController.create
)

// ---- LOGIN
routes.post('/signin', SessionController.store)

// ---- ROTAS PRIVADAS ---- \\
// ---- TECNOLOGIAS
routes.post(`/${baseAPISecurity}/tecnologias`, preferenciasController.create)
routes.put(`/${baseAPISecurity}/tecnologias/:id`, preferenciasController.update)
routes.delete(
  `/${baseAPISecurity}/tecnologias/:id`,
  preferenciasController.delete
)
routes.get(`/${baseAPISecurity}/tecnologias`, preferenciasController.show)

// ---- USUARIOS
routes.put(
  `/${baseAPISecurity}/usuarios/preferencias`,
  UsuariosController.update
)
routes.put(
  `/${baseAPISecurity}/usuarios`,
  validators(usuarioValidator.usuario),
  UsuariosController.update
)
routes.delete(`/${baseAPISecurity}/usuarios`, UsuariosController.delete)
routes.get(`/${baseAPISecurity}/usuarios`, UsuariosController.show)

// ---- MEETUPS
routes.post(
  `/${baseAPISecurity}/meetup`,
  validators(meetupValidator.meetup),
  meetupController.create
)
routes.post(
  `/${baseAPISecurity}/meetup/:id`,
  upload.single('file'),
  meetupController.createimage
)
routes.put(`/${baseAPISecurity}/meetup/:id`, meetupController.update)
routes.delete(`/${baseAPISecurity}/meetup/:id`, meetupController.delete)
routes.get(`/${baseAPISecurity}/meetup/:id`, meetupController.show)
routes.get(`/${baseAPISecurity}/meetup`, meetupController.show)

// ---- INSCRIÇÃO
routes.post(`/${baseAPISecurity}/inscricao`, RegisterController.create)

// ---- DASHBOARD
routes.get(`/${baseAPISecurity}/dashboard/`, DashboardController.show)

module.exports = routes
