var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Event = require('./events.js');


var UserSchema = new Schema({
  name: String,
  street_address: String,
  city: String,
  state: String,
  zip: String,
  level: Number,
  event: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});



var User = mongoose.model('User', UserSchema);

module.exports = User;
