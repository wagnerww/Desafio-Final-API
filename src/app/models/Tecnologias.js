module.exports = (sequelize, DataTypes) => {
  const Tecnologias = sequelize.define('Tecnologias', {
    tecdescricao: DataTypes.STRING
  })

  Tecnologias.associate = models => {
    Tecnologias.belongsToMany(models.Meetups, {
      through: 'MeetupsTecnologias'
    })
    Tecnologias.belongsToMany(models.Usuarios, {
      through: models.UsuariosTecnologias,
      foreignKey: 'id_tecnologias'
    })
  }

  return Tecnologias
}
