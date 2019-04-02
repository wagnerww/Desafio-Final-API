module.exports = (sequelize, DataTypes) => {
  const Meetups = sequelize.define('Meetups', {
    meettitulo: DataTypes.STRING,
    meetdescricao: DataTypes.STRING,
    meetimagem: DataTypes.STRING,
    meetlocalizacao: DataTypes.STRING
  })

  Meetups.associate = models => {
    Meetups.belongsToMany(models.Tecnologias, {
      through: 'MeetupsTecnologias'
    })

    Meetups.belongsToMany(models.Usuarios, {
      through: 'UsuariosMeetups'
    })
  }

  return Meetups
}
