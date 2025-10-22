const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  scheme_name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['housing', 'business', 'education', 'healthcare', 'employment', 'agriculture', 'social_welfare']
  },
  region: {
    type: String,
    required: true
  },
  eligibility: {
    type: [String],
    required: true
  },
  benefit_summary: {
    type: String,
    required: true
  },
  official_link: {
    type: String,
    required: true
  },
  budget_allocated: {
    type: Number,
    default: 0
  },
  applications_count: {
    type: Number,
    default: 0
  },
  success_rate: {
    type: Number,
    default: 0
  },
  keywords: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Index for better search performance
schemeSchema.index({ category: 1, region: 1 });
schemeSchema.index({ keywords: 1 });

module.exports = mongoose.model('Scheme', schemeSchema);