const Mail = require('../services/Mail')

class InscricoesMail {
  get key () {
    return 'Inscricoes'
  }

  async handle (job, done) {
    const { user, meetup } = job.data
    await Mail.sendMail({
      from: '"wagner" wagnerricardonet@gmail.com',
      to: user.usremail,
      subject: `Inscricão para o meetup:${meetup.meettitulo}`,
      // html: `<p>Teste ${content}</p>`
      template: 'inscricao',
      context: { user, meetup }
    })
    return done()
  }
}

module.exports = new InscricoesMail()
