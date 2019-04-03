const { Usuarios } = require('../models')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

class SessionController {
  async store (req, res) {
    const { usremail, usrpassword } = req.body

    const user = await Usuarios.findOne({ where: { usremail } })

    if (!user) {
      return res.status(400).json({ error: 'usuário não encontrado' })
    }

    if (!(await user.checkSenha(usrpassword))) {
      return res.status(400).json({ error: 'senha inválida' })
    }

    const token = await jwt.sign({ user }, authConfig.secret, {
      expiresIn: authConfig.expired
    })

    return res.json({ user, token })
  }
}

module.exports = new SessionController()
