var db = require("../models");

//add new event - must retrieve user information and place it in the _host field by reference.
function create(req, res) {
    db.User.findById(req.params._host, function(err, user) {
        var newEvent = new db.Event({
            _host: user,
            date: req.body.edit_date,
            minimum_level: req.body.edit_min_level,
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
            console.log(events)
            res.json(events);
        });
}
//problems here probably eliminate
function search(req, res) {
    db.Event.find({
            date: req.body.date
        })
        .populate('_host')
        .exec(function(err, events) {
            if (err) {
                return console.log("events error: " + err);
            }
            //  console.log(events._host._id)
            res.json(events);
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

// export public methods here
module.exports = {
    create: create,
    index: index,
    show: show,
    search: search,

};
