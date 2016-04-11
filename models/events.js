var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./user.js');

var EventSchema = new Schema({
    _host: { type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
minimum_level: Number,
status: String,
violin1: { type: Schema.Types.ObjectId, ref: 'User'},
violin2: { type: Schema.Types.ObjectId, ref: 'User'},
viola: { type: Schema.Types.ObjectId, ref: 'User'},
cello: { type: Schema.Types.ObjectId, ref: 'User'},
});



var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
