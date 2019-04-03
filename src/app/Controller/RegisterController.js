const { UsuariosMeetups, Meetups } = require('../models')

class RegisterController {
  async create (req, res) {
    try {
      const idMeetup = req.body.id_meetups
      const data = await UsuariosMeetups.create({
        id_usr: req.userId,
        id_meetups: idMeetup
      })

      // Atualiza membros
      const meetup = await Meetups.findByPk(idMeetup)
      const meetqtdinscritos = meetup.meetqtdinscritos + 1
      await Meetups.update({ meetqtdinscritos }, { where: { id: idMeetup } })

      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao cadastrar - ${error}` })
    }
  }
}

module.exports = new RegisterController()
