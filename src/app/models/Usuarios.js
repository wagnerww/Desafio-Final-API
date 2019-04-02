module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    usrnome: DataTypes.STRING,
    usremail: DataTypes.STRING,
    usrsenha: DataTypes.STRING
  })

  Usuarios.associate = models => {
    Usuarios.belongsToMany(models.Tecnologias, {
      through: 'UsuariosTecnologias'
    })
  }

  return Usuarios
}
