import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import slutify from 'slugify';
import handlebars from 'express-handlebars';

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server on');
});