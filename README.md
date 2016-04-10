This application allows Chamber Music players to host events where other players can enroll and participate. A user signs up, establishes a profile - their instrument, their level of play and their location, and can then either search for upcoming events in cities around the world and sign up to participate or establish an event that they would host.

Technical information

The project uses:
Express Server
body-parser
Handelbars
cookie-parser
MongoDB/Mongoose
jQuery
Passport

HTML Routes

--show signup view--
app.get('/signup', function (req, res) {
  res.sendFile(__dirname + '/views/signup.html');
});

--show login view--
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/views/login.html');
});

--load index.html--
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

--load the search page--
app.get('/search', function (req, res){
  res.sendFile(__dirname + '/views/search.html');
});



API routes

app.put('/api/users/:_id', controllers.usersController.update);
app.post('/api/events/:_host', controllers.eventsController.create);
app.get('/api/events/:_id', controllers.eventsController.index);
app.get('/api/events/:_event_id/', controllers.eventsController.show);
app.get('/api/users/:_id', controllers.usersController.show);
app.get('/api/events/', controllers.eventsController.search);
--retrieves user information from signup or login--
app.get('/api/me', function (req, res) {
  res.json(req.user);
});


--Authentication Routes-
// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    }
  );
});

--log in user--
app.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

--log out user -- NOT IMPLEMENTED--
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", req.user);
  req.logout();
  console.log("AFTER logout", req.user);
  res.redirect('/');
});


Unique challenges
Users should only see those events that they have signed up for or that they are hosting. Their event list has to be sensitive to this and they should not be allowed to delete any event for which they are not the host. The application retrieves user information from the server before loading the Profile page and whenever the event list refreshes.

Database
There are two models - users and events. A user can host and participate in many events
and an event can have many participants (users). The application uses referencing in Mongo to accomplish this.

Disapointments
* I would have like to search on Date as well but could not get the returned json date to match my entered value.
