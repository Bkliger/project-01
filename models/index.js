var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project-01");
module.exports.User = require("./user.js");
module.exports.Event = require("./events.js");
