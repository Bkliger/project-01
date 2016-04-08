var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./user.js');

var EventSchema = new Schema({
    _host: { type: String, ref: 'User'},
    date: Date,
minimum_level: Number,
status: String,
       participants: [{requested_instrument: String, player: { type: String, ref: 'User'}}]
});



var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
