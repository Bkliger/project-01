var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/project-01");
mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL ||
                      "mongodb://localhost/project-01");

module.exports.User = require("./user.js");
module.exports.Event = require("./events.js");
