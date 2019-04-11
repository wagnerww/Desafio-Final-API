const {
  Meetups,
  MeetupsTecnologias,
  Tecnologias,
  Usuarios
} = require('../models')

class MeetupController {
  // ---- CRUD
  async create (req, res) {
    try {
      const { tecnologias } = req.body
      const data = await Meetups.create(req.body)

      await tecnologias.map(tecnologia => {
        const meetupTecnologias = {
          id_meetup: data.id,
          id_tecnologias: tecnologia.id
        }

        MeetupsTecnologias.create(meetupTecnologias)
      })

      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao cadastrar - ${error}` })
    }
  }

  async createimage (req, res) {
    try {
      console.log(req.file)
      const { filename: meetimagem } = req.file
      console.log('img', meetimagem)
      console.log('id', req.params.id)
      const data = await Meetups.update(
        { meetimagem: meetimagem },
        {
          where: { id: req.params.id }
        }
      )
      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao cadastrar - ${error}` })
    }
  }

  async update (req, res) {
    try {
      const data = await Meetups.update(req.body, {
        where: { id: req.params.id }
      })
      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao editar - ${error}` })
    }
  }

  async delete (req, res) {
    try {
      await Meetups.destroy({ where: { id: req.params.id } })
      res.status(200).json({ mensagem: 'Meetup excluído' })
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao excluir - ${error}` })
    }
  }

  async show (req, res) {
    const { id } = req.params
    try {
      const meetups = await Meetups.findOne({
        where: { id },
        include: [
          {
            model: Tecnologias
          },
          {
            model: Usuarios
          }
        ]
      })

      console.log('meet', meetups)
      res.status(200).send(meetups)
    } catch (error) {
      console.log('erro', error)
    }
  }

  // ---- FIM CRUD
}

module.exports = new MeetupController()
