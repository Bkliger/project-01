var db = require("../models");


//user is created by passport - it is updated with complete profile info here
function update(req, res) {
    db.User.update({
            _id: req.params._id
        }, {
            name: req.body.name,
            street_address: req.body.street_address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            level: req.body.level,
            instrument: req.body.instrument
        }, {
            upsert: false
        }, function(err, updateUser) {
            if (err) {
                return console.log("user update error: " + err);
            }
            res.json(updateUser);
        });

//get the complete user object for insertion into the event
    }

    function show(req, res) {
        db.User.find({_id: req.params._id}, function(err, User) {
                if (err) {
                    return console.log("user not found: " + err);
                }
                res.json(User);
            });


        }


    // export public methods here
    module.exports = {
        // create: create,
        update: update,
        show: show,

    };
