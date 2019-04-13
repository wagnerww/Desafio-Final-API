const nodemailer = require('nodemailer')
const mailconfig = require('../../config/mail')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')

const transport = nodemailer.createTransport(mailconfig)

const partialPath = path.resolve(__dirname, '..', 'views', 'emails')
const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: partialPath,
    layoutsDir: partialPath,
    defaultLayout: 'inscricao.hbs'
  },
  viewPath: partialPath,
  extName: '.hbs'
}

transport.use('compile', hbs(handlebarOptions))

module.exports = transport
