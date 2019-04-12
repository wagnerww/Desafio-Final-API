const Joi = require('joi')

module.exports = {
  meetup: Joi.object().keys({
    meettitulo: Joi.string()
      .required()
      .error(() => 'Título/Tema é necessário'),
    meetdescricao: Joi.string()
      .required()
      .error(() => 'Descriçõ é necessário'),
    meetlocalizacao: Joi.string()
      .required()
      .min(4)
      .error(() => 'Localização é necessário')
  })
}
