const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).json({ error: 'token não informado' })
  }
  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    req.userId = decoded.user.id

    return next()
  } catch (e) {
    return res.status(403).json({ error: 'token inválido' })
  }
}
