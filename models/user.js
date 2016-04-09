var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Event = require('./events.js');
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  street_address: String,
  city: String,
  state: String,
  zip: String,
  level: Number,
  instrument: String,
  event: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

UserSchema.plugin(passportLocalMongoose);


var User = mongoose.model('User', UserSchema);

module.exports = User;
