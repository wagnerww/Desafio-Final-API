const { Usuarios, UsuariosTecnologias, Tecnologias } = require('../models')

class UsuariosController {
  async create (req, res) {
    try {
      const data = await Usuarios.create(req.body)

      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao cadastrar - ${error}` })
    }
  }

  async update (req, res) {
    try {
      const id = req.userId
      const { Tecnologias } = req.body
      const data = await Usuarios.update(req.body, {
        where: { id }
      })

      await UsuariosTecnologias.destroy({
        where: { id_usr: id }
      })

      await Tecnologias.map(tecnologia => {
        const meetupTecnologias = {
          id_usr: id,
          id_tecnologias: tecnologia.id
        }

        UsuariosTecnologias.create(meetupTecnologias)
      })

      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao editar - ${error}` })
    }
  }

  async delete (req, res) {
    try {
      const id = req.userId
      await Usuarios.destroy({ where: { id } })
      res.status(200).json({ mensagem: 'Meetup excluído' })
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao excluir - ${error}` })
    }
  }

  async show (req, res) {
    try {
      const id = req.userId
      const users = await Usuarios.findOne({
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

module.exports = new UsuariosController()
