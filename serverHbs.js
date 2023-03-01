const express = require('express')
const app = express()
var hbs = require('express-handlebars');
const port = 3002;

app.set('view engine', 'hbs');

app.engine('.hbs', hbs.engine({
    layoutsDir: __dirname + '/views/hbs/layouts',
    extname: 'hbs',
    defaultLayout: 'planb',
    partialsDir: __dirname + '/views/hbs/partials/'
}));

app.use(express.static('public'))

fakeApi = () => {
    return [
      {
        name: 'Katarina',
        lane: 'midlaner'
      },
      {
        name: 'Jayce',
        lane: 'toplaner'
      },
      {
        name: 'Heimerdinger',
        lane: 'toplaner'
      },
      {
        name: 'Zed',
        lane: 'midlaner'
      },
      {
        name: 'Azir',
        lane: 'midlaner'
      }
    ];
  }


app.get('/', (req, res) => {
    res.render('main', { layout: 'index', suggestedChamps: fakeApi(), listExists: true});
})

app.listen(port, () => console.log(`App listening to port ${port}`));