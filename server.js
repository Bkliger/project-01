var express = require('express'),
    db = require('./models'),
    bodyParser = require('body-parser'),
    app = express();



// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

// var controllers = require('./controllers');
var controllers = require('./controllers');


//load index.html
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//routes
app.post('/api/users', controllers.usersController.create);






/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
