var db = require("../models");

function create(req, res) {
    console.log("this is req.body", req.body);
    var newUser = new db.User({
        name: req.body.name,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        level: req.body.level,
    });
    console.log("this is the resulting newUser", newUser);
    newUser.save(function(err, newUser) {
        if (err) {
            return console.log("user create error: " + err);
        }
        res.json(newUser);
    });

}

function update(req, res) {
    db.User.update({
            _id: req.params._id
        }, {
            name: req.body.name,
            street_address: req.body.street_address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            level: req.body.level
        }, {
            upsert: false
        }, function(err, updateUser) {
            if (err) {
                return console.log("user update error: " + err);
            }
            res.json(updateUser);
        });


    }




    // export public methods here
    module.exports = {
        create: create,
        update: update,

    };
