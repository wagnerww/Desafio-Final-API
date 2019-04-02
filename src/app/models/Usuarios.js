module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    usrnome: DataTypes.STRING,
    usremail: DataTypes.STRING,
    usrsenha: DataTypes.STRING
  })

  Usuarios.associate = models => {
    Usuarios.belongsToMany(models.Tecnologias, {
      through: models.UsuariosTecnologias,
      foreignKey: 'id_usr'
    })
  }

  /* Usuarios.associate = models => {
    Usuarios.belongsToMany(models.Meetups, {
      through: 'UsuariosMeetups',
      as: 'id_meetups'
    })
  } */

  return Usuarios
}
