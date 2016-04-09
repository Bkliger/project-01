var db = require("./models");

var Users =[
  {
        name: 'George Washington',
        street_address: '1336 Santa Fe Ave.',
        city: 'Berkeley',
        state: 'CA',
        zip: '94303',
        level: '5',
      },
  {
        name: 'Thomas Jefferson',
        street_address: '1322 Monticello Way',
        city: 'Monticello',
        state: 'VA',
        zip: '45333',
        level: '6',
        instrument: "1st Violin"
      },
  {
        name: 'John Adams',
        street_address: '1336 Braintree Way',
        city: 'Braintree',
        state: 'MA',
        zip: '45303',
        level: '5',
      },
  {
        name: 'Alexander Hamilton',
        street_address: 'Richard Rogers Theatre',
        city: 'N.Y.',
        state: 'NY',
        zip: '43444',
        level: '5',
      }
];



db.User.remove({}, function(err, users){

  db.User.create(Users, function(err, users){
    if (err) { return console.log('ERROR loading users', err); }
    console.log("all users:", users);
    console.log("created", users.length, "users");
    process.exit();
  });
});
