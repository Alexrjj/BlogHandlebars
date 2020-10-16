import Sequelize from 'sequelize';
import connection from '../database/connection.js';

const Author = connection.define('authors', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Author.sync({ force: false });

export default Author;