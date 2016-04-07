var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./users.js');

var EventSchema = new Schema({
    _host: { type: Number, ref: 'User'},
    date: Date,
minimum_level: Number,
       participants: [{requested_instrument: String, player: { type: Number, ref: 'User'}}]
});



var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
