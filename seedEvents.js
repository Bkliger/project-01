var db = require("./models");


var Events = [
  {
        date: '10/01/2016',
        minimum_level: '4',
        participants: [{requested_instrument: "1st Violin"},{requested_instrument: "2nd Violin"},{requested_instrument: "Viola"},{requested_instrument: "Cello"}]
      },
  {
        date: '11/01/2016',
        minimum_level: '2',
        participants: [{requested_instrument: "1st Violin"},{requested_instrument: "2nd Violin"},{requested_instrument: "Viola"},{requested_instrument: "Cello"}]
      },
  {
        date: '12/01/2016',
        minimum_level: '5',
        participants: [{requested_instrument: "1st Violin"},{requested_instrument: "2nd Violin"},{requested_instrument: "Viola"},{requested_instrument: "Cello"}]
      }

];



db.Event.remove({}, function(err, events){

  db.Event.create(Events, function(err, events){
    if (err) { return console.log('ERROR loading events', err); }
    console.log("all events:", events);
    console.log("created", events.length, "events");
    process.exit();
  });
});
