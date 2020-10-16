import express from 'express';
import bodyParser from 'body-parser';
import slugify from 'slugify';
import handlebars from 'express-handlebars';
import connection from './database/connection.js';
import Author from './authors/Author.js';
import Post from './posts/Post.js';
const app = express();

// Database
connection.authenticate().then(() => {
  console.log('Database Ok');
}).catch((err) => {
  console.log(err);
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View Engine
app.engine('hbs', handlebars( {
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

// Static Files
app.use(express.static('public'));

// ---- GET Routes ----
// Home
app.get('/', (req, res) => {
  Post.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(posts => {
    Author.findAll().then(authors => {
      res.render('index', {
        posts: posts.map(post => post.toJSON()),
        authors: authors.map(author => author.toJSON())
      })
    })
  })
});

// New Author
app.get('/newAuthor', (req, res) => {
  Author.findAll().then(authors => {
    res.render('newAuthor', {
      authors: authors.map(author => author.toJSON())
    })
  })
});

// New Post
app.get('/newPost', (req, res) => {
  Author.findAll().then(authors => {
    res.render('newPost', {
      authors: authors.map(author => author.toJSON())
    })
  })
});

// ---- POST Routes ----
// New Author
app.post('/author/save', (req, res) => {
  let author = req.body.author;
  let email = req.body.email;

  Author.create({
    name: author,
    slug: slugify(author, { lower: true }),
    email: email
  }).then(() => {
    res.redirect('/newAuthor');
  });
});

// New Post
app.post('/post/save', (req, res) => {
  let title = req.body.title;
  let text = req.body.text;
  let author = req.body.author;

  Post.create({
    title: title,
    text: text,
    authorId: author,
    slug: slugify(title, { lower: true })
  }).then(() => {
    res.redirect('/');
  })
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});