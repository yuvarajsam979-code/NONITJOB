const mongoose = require('mongoose');
const Job = require('./models/Job');

const MONGODB_URI = 'mongodb://localhost:27017/ai_job_finder';

const dummyJobs = [
  {
    title: 'Experienced Car Driver',
    description: 'Looking for a professional driver for a private family. Must have valid license and 5+ years experience.',
    salary: '₹18,000 - ₹22,000/month',
    category: 'Driver',
    location: { type: 'Point', coordinates: [80.2450, 13.0600] },
    employer: { name: 'Kumar Sharma', contact: '9876543210' },
    postedAt: new Date()
  },
  {
    title: 'Home Electrician Needed',
    description: 'Require electrician for residential maintenance and wiring. Immediate joining.',
    salary: '₹12,000/month + Incentives',
    category: 'Electrician',
    location: { type: 'Point', coordinates: [80.2700, 13.0800] },
    employer: { name: 'Ravi Electric Works', contact: '9876543211' },
    postedAt: new Date()
  },
  {
    title: 'Shop Assistant (Part-Time)',
    description: 'Need a helpful assistant for a local grocery store. Work hours: 4 PM to 10 PM.',
    salary: '₹8,000/month',
    category: 'Shop Worker',
    location: { type: 'Point', coordinates: [80.2200, 13.0400] },
    employer: { name: 'Metro Provisions', contact: '9876543212' },
    postedAt: new Date()
  },
  {
    title: 'Delivery Executive (Bikes)',
    description: 'Food delivery for local restaurant chain. Bike and License mandatory.',
    salary: '₹15,000 - ₹25,000/month',
    category: 'Delivery',
    location: { type: 'Point', coordinates: [80.2500, 13.0700] },
    employer: { name: 'FastBites Chennai', contact: '9876543213' },
    postedAt: new Date()
  },
  {
    title: 'Emergency Plumber',
    description: 'Urgent requirement for a plumber at a construction site in T-Nagar.',
    salary: '₹600 - ₹800 / Day',
    category: 'Plumber',
    location: { type: 'Point', coordinates: [80.2300, 13.0300] },
    employer: { name: 'BuildRight Const.', contact: '9876543214' },
    postedAt: new Date()
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');
    await Job.deleteMany({}); // Clear old data
    await Job.insertMany(dummyJobs);
    console.log('Successfully added 5 premium dummy jobs!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
