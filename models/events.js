var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var EventSchema = new Schema({
    _host: { type: Number, ref: 'User'},
    date_from: Date,
         date_to: Date,
 day_of_week: String,
minimum_level: Number,
       participants: [{requested_instrument: String, player: { type: Number, ref: 'User'}}]
});



var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
