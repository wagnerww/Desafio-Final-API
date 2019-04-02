const { Meetups, MeetupsTecnologias } = require('../models')

class MeetupController {
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
}

module.exports = new MeetupController()
