const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use('/favicon.ico', express.static('favicon_package_v0.16/favicon.ico'));
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static("public"));

// Here we're setting the views directory to be ./views
// thereby letting the app know where to find the templates files
app.set('views', './views');

// Here we're setting the default engine to be ejs
// note we don't need to require it, express will do that for us
app.set('view engine', 'ejs');

// Now instead of using res.send we can use
// res.render to send the output of the template by filename






app.get('/', (req, res) => {
    const data = {
      person: {
        firstName: 'Emmanuel',
        lastName: 'Donate',
      }
    }



    app.get('/contact', (req, res) => {
        res.render('contact');
      });
      
      app.post('/thanks', (req, res) => {

        var api_key = 'key-4c3cfadb6caaf7fc1ae4189f01855d20-3b1f59cf-e5cf27b2';
        var domain = 'sandbox1012d582b63f4ec7bdd43452e98229f3.mailgun.org';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
         
        var data = {
          from: 'Emmanuel Donate <postmaster@sandbox1012d582b63f4ec7bdd43452e98229f3.mailgun.org>',
          to: 'emmanuel.omar.d@gmail.com',
          subject: req.body.Name,
          text: req.body.message,
        };
         
        mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });



        res.render('thanks', { contact: req.body })
      });
      
  
    // Notice now the data is the second argument passed to the template render method
    res.render('index', data);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('listening at http://localhost:' + PORT);
});