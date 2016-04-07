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

var Events = [
  {
        date_from: '10/01/2016',
        date_to: '10/10/2016',
        day_of_week: "Weekday",
        minimum_level: '4',
        participants: [{requested_instrument: "1st Violin"},{requested_instrument: "2nd Violin"},{requested_instrument: "Viola"},{requested_instrument: "Cello"}]
      }









];


db.Album.remove({}, function(err, albums){

  db.Album.create(albumsList, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });
});
