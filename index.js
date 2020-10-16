import express from 'express';
import bodyParser from 'body-parser';
import slutify from 'slugify';
import handlebars from 'express-handlebars';
const app = express();

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

// ---- Routes ----
// Home
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server on');
});