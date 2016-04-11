var db = require("../models");

//add new event - must retrieve user information and place it in the _host field by reference.
function create(req, res) {
    db.User.findById(req.params._host, function(err, user) {
        var newEvent = new db.Event({
            _host: user,
            date: req.body.edit_date,
            minimum_level: req.body.edit_min_level,
            violin1: new db.User,
            violin2: new db.User,
            viola: new db.User,
            cello: new db.User,
            status: "open"
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
    if (req.body.index === '0') {
        db.Event.update({
            _id: req.params._event_id
        }, {
            violin1: req.body.player[0],
        }, {
            upsert: false
        }, function(err, updateEvent) {
            if (err) {
                return console.log("event update error: " + err);
            }
            console.log("update", updateEvent);
            res.json(updateEvent);
        });
    } else if (req.body.index === '1') {
        console.log("inside if")
        db.Event.update({
            _id: req.params._event_id
        }, {
            violin2: req.body.player[0],
        }, {
            upsert: false
        }, function(err, updateEvent) {
            if (err) {
                return console.log("event update error: " + err);
            }
            console.log("update", updateEvent);
            res.json(updateEvent);
        });
      } else if (req.body.index === '2') {
                console.log("inside if")
                db.Event.update({
                    _id: req.params._event_id
                }, {
                    viola: req.body.player[0],
                }, {
                    upsert: false
                }, function(err, updateEvent) {
                    if (err) {
                        return console.log("event update error: " + err);
                    }
                    console.log("update", updateEvent);
                    res.json(updateEvent);
                });
        } else if (req.body.index === '3') {
                console.log("inside if")
                db.Event.update({
                    _id: req.params._event_id
                }, {
                    cello: req.body.player[0],
                }, {
                    upsert: false
                }, function(err, updateEvent) {
                    if (err) {
                        return console.log("event update error: " + err);
                    }
                    console.log("update", updateEvent);
                    res.json(updateEvent);
                });
          }
        }

        // // from Julianna
        // function update1(req, res) {
        // console.log(req.body);
        //   db.Event.findById(req.params._event_id, function(err, foundEvent) {
        //     console.log(foundEvent);
        //     console.log(foundEvent.participants[0]);
        //     foundEvent.participants[0]['player'] = req.body.player;
        //
        //     foundEvent.save(function(err, saved) {
        //       // console.log('UPDATED', foundEvent.participants[0], 'IN ', saved.participants);
        //       res.json(saved);
        //     });
        //   });
        // };




        //get one event to edit
        function show(req, res) {
            db.Event.findById(req.params._event_id)
                .populate('_host violin1 violin2 viola cello')
                .exec(function(err, event) {
                    if (err) {
                        return console.log("event not found: " + err);
                    }
                    res.json(event);
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
        //delete event
        function delete1(req, res) {
            db.Event.remove({
                _id: req.params._event_id
            }, function(err, event) {
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
