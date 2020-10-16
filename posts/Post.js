import Sequelize from 'sequelize';
import connection from '../database/connection.js';
import Author from '../authors/Author.js';

const Post = connection.define('posts', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Author.hasMany(Post); // Um autor tem muitos posts.
Post.belongsTo(Author); // Um post pertence a um autor.

Post.sync({ force: false });

export default Post;