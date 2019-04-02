'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meetups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      meettitulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      meetdescricao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      meetimagem: {
        type: Sequelize.STRING,
        allowNull: false
      },
      meetlocalizacao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('meetup')
  }
}
