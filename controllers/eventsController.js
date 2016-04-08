var db = require("../models");

function create(req,res) {
  console.log("this is req.body", req.body);
  var newEvent = new db.Event({
     _host: req.params._host,
     date: req.body.date,
     minimum_level: req.body.minimum_level,
  });
  console.log("this is the resulting newEvent",newEvent);
  newEvent.save(function(err,newEvent){
    if (err) { return console.log("event create error: " + err); }
          res.json(newEvent);
  });

}

function getAll(req,res) {
  console.log("getting all the events");
  db.Event.find ()
  .exec(function(err, events){
   if (err) { return console.log("events error: " + err); }
   res.json(events);
 });
}



// export public methods here
module.exports = {
  create: create,
  getAll: getAll,

};
