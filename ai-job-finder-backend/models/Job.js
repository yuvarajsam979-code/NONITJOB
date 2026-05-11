const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  salary: { type: String },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
    address: { type: String }
  },
  employer: {
    name: { type: String },
    contact: { type: String, required: true },
    isVerified: { type: Boolean, default: false }
  },
  source: { type: String, default: 'user' }, // 'user' or 'scraped'
  language: { type: String, default: 'en' },
  postedAt: { type: Date, default: Date.now },
  isScam: { type: Boolean, default: false }
});

JobSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Job', JobSchema);
