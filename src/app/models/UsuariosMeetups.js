module.exports = (sequelize, DataTypes) => {
  const UsuariosMeetups = sequelize.define('UsuariosMeetups', {
    id_usr: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_meetups: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  })

  return UsuariosMeetups
}
