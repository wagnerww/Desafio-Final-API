const Joi = require('joi')

module.exports = (mailRequired = true) => {
  const validation = {}
  validation.usrnome = Joi.string()
    .required()
    .error(() => 'Nome é necessário')

  validation.usrsenha = Joi.string()
    .optional()
    .allow('')
    .min(4)
    .error(() => 'Senha é necessária')

  validation.usrsenha_confirmacao = Joi.string()
    .optional()
    .allow('')

  if (mailRequired) {
    validation.usremail = Joi.string()
      .email()
      .required()
      .error(() => 'Email é necessário')
  }

  validation.tecnologias = Joi.array()
    .optional()
    .error(() => 'É necessário informar as técnologias')

  return Joi.object().keys(validation)
}
