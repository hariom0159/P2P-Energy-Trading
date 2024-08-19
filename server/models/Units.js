const mongoose = require("mongoose");

const unitSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: {
    type: String,
    ref: 'User'
  } ,
  userEmail: {
    type: String,
    ref: 'User'
  },
  price: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  }
});

module.exports = mongoose.model("Units", unitSchema);
