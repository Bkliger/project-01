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
    console.log("this is the resulting newEvent",newEvent);
    newEvent.save(function(err,newEvent){
      if (err) { return console.log("event create error: " + err); }
            res.json(newEvent);
    });

  });

}

function getAll(req,res) {
  db.Event.find ()
  .populate('_host')
  .exec(function(err, events){
   if (err) { return console.log("events error: " + err); }
   res.json(events);
 });
}


function update(req, res) {
    console.log("1 this is req.body", req.body);
    console.log("2 this is user id", req.params._id);

    // db.User.update({"_id": ObjectId(req.params._id)},{
    db.User.update({
            _id: req.params._id
        }, {
            _host: req.params.something here,
            date: req.body.date,
            minimum_level: req.body.minimum_level,
        }, {
            upsert: false
        }, function(err, updateEvent) {
            if (err) {
                return console.log("event update error: " + err);
            }
            res.json(updateEvent);
        });


    }


// export public methods here
module.exports = {
  create: create,
  getAll: getAll,
  update: update,

};
