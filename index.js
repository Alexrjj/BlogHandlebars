import express from 'express';
import bodyParser from 'body-parser';
import slugify from 'slugify';
import handlebars from 'express-handlebars';
import connection from './database/connection.js';
import Author from './authors/Author.js';
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
  res.render('index');
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
  res.render('newPost');
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


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});