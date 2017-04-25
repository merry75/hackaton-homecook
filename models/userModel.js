//todo
//userSchema and model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: String, 
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  google: String,
  role: String,
  tokens: Array,
  profile: {
    name: String,
    adress: {
      adress: String,
      mapsLocation: []
    },
    food: [/*here goes the food*/],
    reviews: [/*here goes the reviews*/],
    availability: {/*here goes the avalieoala*/},
  }
}, { timestamps: true });

var User = mongoose.model("User", UserSchema);



module.exports = User;
