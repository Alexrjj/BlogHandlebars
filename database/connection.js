import Sequelize from 'sequelize';

const connection = new Sequelize('bloghandlebars', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00'
});

module.exports = connection;