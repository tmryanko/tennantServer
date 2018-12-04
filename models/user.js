const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  tennantList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tennant'
  }]
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) { // if the user dont change the password
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;
    
    return next();
  } catch (err) {
    return next(err);
  }
});
userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password); // return boolean

    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
