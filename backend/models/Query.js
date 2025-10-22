const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  user_query: {
    type: String,
    required: true
  },
  intent: {
    type: String,
    required: true
  },
  matched_schemes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme'
  }],
  response_time: {
    type: Number,
    default: 0
  },
  user_feedback: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Query', querySchema);