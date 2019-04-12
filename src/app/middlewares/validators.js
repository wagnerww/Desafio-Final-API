const Joi = require('joi')
const middleware = schema => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema)
    let valid = false
    error ? (valid = false) : (valid = true)

    if (valid) {
      next()
    } else {
      let mensagem = ''
      error.details.map(err => {
        mensagem = err.message
      })
      res.status(400).json({ error: mensagem })
    }
  }
}
module.exports = middleware
