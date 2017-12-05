const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();
  app
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json({ limit: '5mb' })) // Parse application/json
  .use(bodyParser.urlencoded({ extended: true, limit: '5mb' })) // Parse application/x-www-form-urlencoded
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')


  app.get('/', (req, res) => res.render('pages/index'));
  app.post('/', (req, res) => res.send(`token received ${req.body.token}`));


  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
