const { Tecnologias } = require('../models')

class TecnologiasController {
  async create (req, res) {
    try {
      const data = await Tecnologias.create(req.body)
      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao cadastrar - ${error}` })
    }
  }

  async update (req, res) {
    try {
      const data = await Tecnologias.update(
        { tecdescricao: req.body.tecdescricao },
        { where: { id: req.params.id } }
      )
      res.status(200).send(data)
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao editar - ${error}` })
    }
  }

  async delete (req, res) {
    try {
      await Tecnologias.destroy({ where: { id: req.params.id } })
      res.status(200).json({ mensagem: 'Tecnologia excluída' })
    } catch (error) {
      res.status(400).json({ mensagem: `falha ao excluir - ${error}` })
    }
  }
}

module.exports = new TecnologiasController()
