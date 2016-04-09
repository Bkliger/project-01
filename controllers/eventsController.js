var db = require("../models");

function create(req,res) {
  //get user id
  db.User.findById(req.params._host, function(err,user){
    console.log(user);
    var newEvent = new db.Event({
       _host: user,
       date: req.body.date,
       minimum_level: req.body.minimum_level,
    });
    newEvent.save(function(err,newEvent){
      if (err) { return console.log("event create error: " + err); }
            res.json(newEvent);
    });

  });

}

function index(req,res) {

//_host._id: req.user._id
  db.Event.find ()
  .populate('_host')
  .exec(function(err, events){
   if (err) { return console.log("events error: " + err); }
  //  console.log(events._host._id)
   res.json(events);
 });
}


function show(req, res) {
  console.log("2 this is event id", req.params._event_id);
      db.Event.findById(req.params._event_id, function(err,event){
        if (err) { return console.log("event not found: " + err); }
        res.json(event);
      });
  }

// export public methods here
module.exports = {
  create: create,
  index: index,
  show: show,

};
