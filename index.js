const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();
  app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')


  app.get('/', (req, res) => res.render('pages/index'));
  app.post('/', (req, res) => res.send(`token received ${req.body.token}`));


  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
