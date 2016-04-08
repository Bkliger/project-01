var db = require("../models");

function create(req,res) {
  //get a users
  db.User.findById(req.params._host, function(err,user){
    console.log(user);
    var newEvent = new db.Event({
       _host: user,
       date: req.body.date,
       minimum_level: req.body.minimum_level,
    });
    console.log("this is the resulting newEvent",newEvent);
    newEvent.save(function(err,newEvent){
      if (err) { return console.log("event create error: " + err); }
            res.json(newEvent);
    });

  });

}

function getAll(req,res) {
  console.log("getting all the events");
  db.Event.find ()
  .populate('_host')
  .exec(function(err, events){
   if (err) { return console.log("events error: " + err); }
   console.log(events);
   res.json(events);
 });
}



// export public methods here
module.exports = {
  create: create,
  getAll: getAll,

};
