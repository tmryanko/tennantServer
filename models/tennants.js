const mongoose = require('mongoose');

const tennantSchema = mongoose.Schema({
  name: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  adress: {
    type: String
  },
  financialDebt: {
    type: Boolean
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

const Tennant = mongoose.model('Tennant', tennantSchema);

module.exports = Tennant;
