const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const slutify = require('slugify');
const handlebars = require('express-handlebars');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server on');
});