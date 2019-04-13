const { Usuarios, UsuariosTecnologias, Tecnologias } = require('../models')

class UsuariosController {
  async create (req, res) {
    try {
      const { usremail } = req.body
      const userExiste = await Usuarios.findOne({ where: { usremail } })

      if (userExiste === null) {
        const data = await Usuarios.create(req.body)

        res.status(200).send(data)
      } else {
        res.status(400).json({ error: 'Já exise um usuário com este email' })
      }
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao cadastrar - ${error}` })
    }
  }

  async update (req, res) {
    try {
      const id = req.userId
      const { tecnologias } = req.body
      const data = await Usuarios.update(
        { ...req.body, usrprimeiroacesso: false },
        {
          where: { id }
        }
      )

      await UsuariosTecnologias.destroy({
        where: { id_usr: id }
      })

      await tecnologias.map(tecnologia => {
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
