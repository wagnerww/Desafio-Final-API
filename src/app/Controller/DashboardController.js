const { Usuarios, Meetups, Tecnologias } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class DashboardController {
  async show (req, res) {
    const id = req.userId
    try {
      // ---- Busca as inscrições do usuário
      const usuario = await Usuarios.findOne({
        where: { id },
        include: [
          {
            model: Meetups
          },
          {
            model: Tecnologias
          }
        ]
      })

      // ---- Adicona as tecnologias para buscar os interesses
      let tecnologiasUser = []
      await usuario.Tecnologias.map(tecnologia => {
        tecnologiasUser.push(tecnologia.id)
      })

      // ---- Adiciona os Meetups do usuário
      let meetupsUser = []
      await usuario.Meetups.map(meetup => {
        meetupsUser.push(meetup.id)
      })

      // ---- Interesses do Usuário
      const meetupsRecomendados = await Meetups.findAll({
        include: [
          {
            model: Tecnologias,
            where: { id: { [Op.in]: tecnologiasUser } }
          }
        ]
      })

      let listaRecomenados = []
      let isExiste = false
      // busca os recomendados, mas add os que não estão inscritos
      await meetupsRecomendados.find(recomendado => {
        isExiste = false
        usuario.Meetups.find(meetupUser => {
          if (meetupUser.id === recomendado.id) {
            isExiste = true
          }
        })
        if (!isExiste) {
          listaRecomenados.push(recomendado)
        }
      })

      // ---- Busca todas as Meetups existentes e remove as do usuário
      const meetupsProximos = await Meetups.findAll({
        where: { id: { [Op.notIn]: meetupsUser } }
      })

      const retorno = {
        inscricoes: usuario.Meetups,
        proximos: meetupsProximos,
        recomendados: listaRecomenados
      }

      res.status(200).send(retorno)
    } catch (error) {
      console.log('erro', error)
    }
  }
}

module.exports = new DashboardController()
