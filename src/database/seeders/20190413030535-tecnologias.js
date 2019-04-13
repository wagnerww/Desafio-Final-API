'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tecnologias', [
      {
        tecdescricao: 'Front-end',
        created_at: '2019-04-13 01:00:00',
        updated_at: '2019-04-13 01:00:00'
      },
      {
        tecdescricao: 'Back-end',
        created_at: '2019-04-13 01:00:00',
        updated_at: '2019-04-13 01:00:00'
      },
      {
        tecdescricao: 'Mobile',
        created_at: '2019-04-13 01:00:00',
        updated_at: '2019-04-13 01:00:00'
      },
      {
        tecdescricao: 'DevOps',
        created_at: '2019-04-13 01:00:00',
        updated_at: '2019-04-13 01:00:00'
      },
      {
        tecdescricao: 'Gestão',
        created_at: '2019-04-13 01:00:00',
        updated_at: '2019-04-13 01:00:00'
      },
      {
        tecdescricao: 'Marketing',
        created_at: '2019-04-13 01:00:00',
        updated_at: '2019-04-13 01:00:00'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {}
}
