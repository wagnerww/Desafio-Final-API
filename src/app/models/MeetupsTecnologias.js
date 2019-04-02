module.exports = (sequelize, DataTypes) => {
  const MeetupsTecnologias = sequelize.define('MeetupsTecnologias', {
    id_meetup: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tecnologias: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  })

  return MeetupsTecnologias
}
