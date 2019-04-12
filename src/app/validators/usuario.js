const Joi = require('joi')

module.exports = {
  usuario: Joi.object().keys({
    usrnome: Joi.string()
      .required()
      .error(() => 'Nome é necessário'),
    usremail: Joi.string()
      .email()
      .required()
      .error(() => 'Email é necessário'),
    usrsenha: Joi.string()
      .required()
      .min(4)
      .error(() => 'Senha é necessária')
  })
}
