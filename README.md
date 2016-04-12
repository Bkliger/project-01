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
app.get('/api/events/', controllers.eventsController.index);
app.get('/api/events/:_event_id/', controllers.eventsController.show);
app.put('/api/events/:_event_id/', controllers.eventsController.update);
app.delete('/api/events/:_event_id/', controllers.eventsController.delete);
app.put('/api/events1/:_event_id/', controllers.eventsController.update1);
app.get('/api/users/:_id', controllers.usersController.show);
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

ER Diagram.

Although the initial design called for a many to many relationship between users and events, the implementation only called for a 1 to many relationship with 1 event having a host(user) and up to 4 participants (users).

Stories

Story 1
User Story 1 - User signs up is taken to a profile page where they can enter more detailed information about themselves including their playing level from a drop down. They then click the Save button and the data is saved. Required: all fields. If they have already signed up, they log in and are presented with their profile page and all events that they are hosting or have signed up to participate in.

Story 2
User Story 2 - On the User Profile window, the user clicks the Create New Event button. A modal Dialog Box pops up. The user fills in the date and the minimum level. There are 4 instruments for every event. The dialog box closes and the event is listed. If the user clicks the Cancel button, the modal dialog box closes and no changes are made to the event list.

Story 3
User Story 3 - edit an event - The user selects an event from the list on the User Profile window. An Event Information modal Dialog Box pops up. The Delete Button is visible. The user can edit all fields (they are still required). The user clicks the Save Event button and the dialog box closes and the event is listed on the User Profile window.

Story 4
User Story 4 - Delete an Event - on the Edit Event modal dialog box, the user clicks the Delete Event button. The event is deleted, the dialog box closes and the event is no longer displayed on the list in the User Profile window.

Story 5
User Story 5 - Search for an Event. From their profile page, the user clicks the search button and a search page is displayed. The match is made based on the date and city and the level of the user being equal to or greater than the minimum level.


User information
The user begins from either a signup (localhost:3000/signup) or login (localhost:3000/login).

Unique challenges
Users should only see those events that they have signed up for or that they are hosting. Their event list has to be sensitive to this and they should not be allowed to delete any event for which they are not the host. The application retrieves user information from the server before loading the Profile page and whenever the event list refreshes.

Database
There are two models - users and events. A user can host and participate in many events
and an event can have many participants (users). The application uses referencing in Mongo to accomplish this.

Disapointments/To Do's
* I would have like to search on Date as well but could not get the returned json date to match my entered value.

* Display translated levels everywhere. I do this in some places through a function but it would be more complicated to do it through handlebars.

* I could not get the event to update with participants - need help here.

* logout
