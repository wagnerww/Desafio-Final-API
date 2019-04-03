module.exports = (sequelize, DataTypes) => {
  const Meetups = sequelize.define(
    'Meetups',
    {
      meettitulo: DataTypes.STRING,
      meetdescricao: DataTypes.STRING,
      meetimagem: DataTypes.STRING,
      meetlocalizacao: DataTypes.STRING,
      meetqtdinscritos: DataTypes.INTEGER
    },
    {
      hooks: {
        beforeCreate: async meetup => {
          meetup.meetqtdinscritos = 0
        }
      }
    }
  )

  Meetups.associate = models => {
    Meetups.belongsToMany(models.Tecnologias, {
      through: models.MeetupsTecnologias,
      foreignKey: 'id_meetup'
    })

    Meetups.belongsToMany(models.Usuarios, {
      through: models.UsuariosMeetups,
      foreignKey: 'id_meetups'
    })
  }

  return Meetups
}
