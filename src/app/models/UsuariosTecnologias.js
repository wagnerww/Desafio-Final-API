module.exports = (sequelize, DataTypes) => {
  const UsuariosTecnologias = sequelize.define('UsuariosTecnologias', {
    id_usr: {
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

  return UsuariosTecnologias
}
