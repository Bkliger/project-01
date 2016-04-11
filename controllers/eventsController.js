var db = require("../models");

//add new event - must retrieve user information and place it in the _host field by reference.
function create(req, res) {
    db.User.findById(req.params._host, function(err, user) {
        var newEvent = new db.Event({
            _host: user,
            date: req.body.edit_date,
            minimum_level: req.body.edit_min_level,
            participants: [{
                requested_instrument: "1st Violin"
            }, {
                requested_instrument: "2nd Violin"
            }, {
                requested_instrument: "Viola"
            }, {
                requested_instrument: "Cello"
            }],
        });
        newEvent.save(function(err, newEvent) {
            if (err) {
                return console.log("event create error: " + err);
            }
            res.json(newEvent);
        });
    });
}

function index(req, res) {
    db.Event.find()
        .populate('_host')
        .exec(function(err, events) {
            if (err) {
                return console.log("events error: " + err);
            }
            res.json(events);
        });
}

function update(req, res) {
    db.Event.update({
        _id: req.params._event_id
    }, {
        date: req.body.edit_date,
        minimum_level: req.body.edit_min_level,
    }, {
        upsert: false
    }, function(err, updateEvent) {
          if (err) {
              return console.log("user update error: " + err);
          }
        res.json(updateEvent);
      });
  }

  function update1(req, res) {
    var leftSide = "participants[req.body.index].player"
    console.log(req.body);
      db.Event.update({
          _id: req.params._event_id
      }, {
          leftSide: req.body.player,
      }, {
          upsert: false
      }, function(err, updateEvent) {
            if (err) {
                return console.log("user update error: " + err);
            }
          console.log("update",updateEvent);
          res.json(updateEvent);
        });
    }

//get one event to edit
function show(req, res) {
    db.Event.findById(req.params._event_id, function(err, event) {
        if (err) {
            return console.log("event not found: " + err);
        }
        res.json(event);
    });
}

//delete event
function delete1(req, res) {
    db.Event.remove({_id: req.params._event_id}, function(err, event) {
        if (err) {
            return console.log("event not found: " + err);
        }
        res.json(event);
    });
}

// export public methods here
module.exports = {
    create: create,
    index: index,
    show: show,
    update: update,
    delete: delete1,
    update1: update1,


};
