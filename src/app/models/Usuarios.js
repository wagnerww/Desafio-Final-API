const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define(
    'Usuarios',
    {
      usrnome: DataTypes.STRING,
      usremail: DataTypes.STRING,
      usrsenha: DataTypes.VIRTUAL,
      usrsenha_hash: DataTypes.STRING,
      usrprimeiroacesso: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async usuario => {
          if (usuario.usrsenha) {
            usuario.usrsenha_hash = await bcrypt.hash(usuario.usrsenha, 10)
          }
        },
        beforeCreate: async usuario => {
          usuario.usrprimeiroacesso = true
        },
        beforeUpdate: async usuario => {
          usuario.usrprimeiroacesso = false
        }
      }
    }
  )

  Usuarios.prototype.checkSenha = function (senha) {
    return bcrypt.compare(senha, this.usrsenha_hash)
  }

  Usuarios.associate = models => {
    Usuarios.belongsToMany(models.Tecnologias, {
      through: models.UsuariosTecnologias,
      foreignKey: 'id_usr'
    })

    Usuarios.belongsToMany(models.Meetups, {
      through: models.UsuariosMeetups,
      foreignKey: 'id_usr'
    })
  }

  return Usuarios
}
