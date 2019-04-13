const { Usuarios, Meetups, Tecnologias } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class DashboardController {
  async show (req, res) {
    const id = req.userId
    try {
      const filtersPadrao = {}
      const filterProximo = {}

      if (req.query.titulo) {
        const { titulo } = req.query
        filtersPadrao.meettitulo = { [Op.like]: `%${titulo}%` }
        filterProximo.meettitulo = { [Op.like]: `%${titulo}%` }
      }
      // ---- Busca as inscrições do usuário
      const usuario = await Usuarios.findOne({
        where: { id },
        include: [
          {
            model: Meetups,
            where: filtersPadrao
          },
          {
            model: Tecnologias
          }
        ]
      })

      // ---- Adicona as tecnologias para buscar os interesses
      let tecnologiasUser = []
      usuario != null
        ? await usuario.Tecnologias.map(tecnologia => {
          tecnologiasUser.push(tecnologia.id)
        })
        : (tecnologiasUser = [])

      // ---- Adiciona os Meetups do usuário
      let meetupsUser = []
      usuario != null
        ? await usuario.Meetups.map(meetup => {
          meetupsUser.push(meetup.id)
        })
        : (meetupsUser = [])

      // ---- Interesses do Usuário
      const meetupsRecomendados = await Meetups.findAll({
        where: filtersPadrao,
        include: [
          {
            model: Tecnologias,
            where: {
              id: { [Op.in]: tecnologiasUser }
            }
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
      filterProximo.id = { [Op.notIn]: meetupsUser }
      const meetupsProximos = await Meetups.findAll({
        where: filterProximo
      })

      const uerMeetup = usuario != null ? usuario.Meetups : []

      const retorno = {
        inscricoes: uerMeetup,
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
