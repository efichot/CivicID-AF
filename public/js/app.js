// Step 2: Instantiate instance of civic.sip
var civicSip = new civic.sip({ appId: 'HJ4qmqtgz' });

// Step 3: Start scope request.
$('button.js-signup').click(function(event) {
    civicSip.signup({ style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP });
  })

  // Listen for data
  civicSip.on('auth-code-received', function (event) {
    /*
        event:
        {
            event: "scoperequest:auth-code-received",
            response: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiI2Y2EwNTEzMi0wYTJmLTQwZjItYTg2Yi03NTkwYmRjYzBmZmUiLCJpYXQiOjE0OTQyMjUxMTkuMTk4LCJleHAiOjE0OTQyMjUyOTkuMTk4LCJpc3MiOiJjaXZpYy1zaXAtaG9zdGVkLXNlcnZpY2UiLCJhdWQiOiJodHRwczovL3BoNHg1ODA4MTUuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZGV2Iiwic3ViIjoiY2l2aWMtc2lwLWhvc3RlZC1zZXJ2aWNlIiwiZGF0YSI6eyJjb2RlVG9rZW4iOiJjY2E3NTE1Ni0wNTY2LTRhNjUtYWZkMi1iOTQzNjc1NDY5NGIifX0.gUGzPPI2Av43t1kVg35diCm4VF9RUCF5d4hfQhcSLFvKC69RamVDYHxPvofyyoTlwZZaX5QI7ATiEMcJOjXRYQ",
            type: "code"
        }
    */

    // encoded JWT Token is sent to the server
    const jwtToken = event.response;

    // Your function to pass JWT token to your server
    console.log(jwtToken);

    // const civicClient = civicSip.newClient({ appId: 'HJ4qmqtgz',
    // prvKey: "cb8ad58a68020421016942d8a261c7b4c83f9bfef288bb45b5c06f75c21bf4ed",
    // appSecret: "9b169c65be197fde8069366f9fc36bf7" });

    civicClient.exchangeCode(jwtToken)
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

  });

  civicSip.on('user-cancelled', function (event) {
    /*
        event:
        {
          event: "scoperequest:user-cancelled"
        }
    */
   });

   // Error events.
   civicSip.on('civic-sip-error', function (error) {
      // handle error display if necessary.
      console.log('   Error type = ' + error.type);
      console.log('   Error message = ' + error.message);
   });