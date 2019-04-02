const { Usuarios, UsuariosTecnologias, Tecnologias } = require('../models')

class MeetupController {
  async create (req, res) {
    try {
      const { tecnologias } = req.body
      const data = await Usuarios.create(req.body)

      await tecnologias.map(tecnologia => {
        const meetupTecnologias = {
          id_usr: data.id,
          id_tecnologias: tecnologia.id
        }

        UsuariosTecnologias.create(meetupTecnologias)
      })

      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao cadastrar - ${error}` })
    }
  }

  async update (req, res) {
    try {
      const data = await Usuarios.update(req.body, {
        where: { id: req.params.id }
      })
      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao editar - ${error}` })
    }
  }

  async delete (req, res) {
    try {
      await Usuarios.destroy({ where: { id: req.params.id } })
      res.status(200).json({ mensagem: 'Meetup excluído' })
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao excluir - ${error}` })
    }
  }

  async show (req, res) {
    const { id } = req.params
    try {
      const users = await Usuarios.findAll({
        where: { id },
        include: [
          {
            model: Tecnologias
          }
        ]
      })
      res.status(200).send(users)
    } catch (error) {
      console.log('erro', error)
    }
  }
}

module.exports = new MeetupController()
