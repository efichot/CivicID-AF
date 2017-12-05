const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 5000
const civicSip = require('civic-sip-api');

const app = express();
  app
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json({ limit: '5mb' })) // Parse application/json
  .use(bodyParser.urlencoded({ extended: true, limit: '5mb' })) // Parse application/x-www-form-urlencoded
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')


  app.get('/', (req, res) => res.render('pages/index'));
  app.post('/sendtoken', (req, res) => {
    const { token } = req.body.token;

    // Step 4: Initialize instance passing your appId and secret.
    const civicClient = civicSip.newClient({ appId: 'HJ4qmqtgz',
                                              prvKey: 'cb8ad58a68020421016942d8a261c7b4c83f9bfef288bb45b5c06f75c21bf4ed',
                                              appSecret: '9b169c65be197fde8069366f9fc36bf7' });
    // Step 5: Exchange authorization code for user data.

    civicClient.exchangeCode(token)
    .then(function(userData) {
        // store user data and userId as appropriate
        console.log("userData = " + JSON.stringify(userData));

        /*  example for response to a CIVIC_BASIC scope request:
            userData = {
                "data": [
                    {
                        "label": "contact.verificationLevel.CIVIC_0",
                        "value": "contact.verificationLevel.CIVIC_0, true",
                        "isValid": true,
                        "isOwner": true
                    },
                    {
                        "label": "contact.personal.email",
                        "value": "user.test@gmail.com",
                        "isValid": true,
                        "isOwner": true
                    },
                    {
                        "label": "contact.personal.phoneNumber",
                        "value": "+1 555-618-7380",
                        "isValid": true,
                        "isOwner": true
                    }
                ],
                "userId": "36a59d10-6c53-17f6-9185-gthyte22647a"
            }
        */
    }).catch(function(error) {

    });

    res.send({
      done: 'success',
      token
    });
  })


  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
