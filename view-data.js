#!/usr/bin/env node

// Data viewer script for your MongoDB collections
// Usage: node view-data.js [local|production]

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: 'server/.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bitcoin-policy-forms';

console.log('🗄️  Bitcoin Policy Initiative - Data Viewer');
console.log('=' .repeat(50));
console.log(`📡 Connecting to: ${MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);

// Connect to MongoDB
try {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');
} catch (error) {
  console.error('❌ MongoDB connection failed:', error.message);
  process.exit(1);
}

// Define schemas (same as in your backend)
const policySignupSchema = new mongoose.Schema({
  email: String,
  type: String,
  createdAt: Date,
  name: String,
  organization: String,
  message: String,
  status: String
});

const contactSubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  organization: String,
  message: String,
  createdAt: Date
});

const newsletterSignupSchema = new mongoose.Schema({
  email: String,
  createdAt: Date
});

const PolicySignup = mongoose.model('PolicySignup', policySignupSchema);
const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);
const NewsletterSignup = mongoose.model('NewsletterSignup', newsletterSignupSchema);

// Display data
async function displayData() {
  console.log('\n📊 DATABASE OVERVIEW');
  console.log('=' .repeat(30));

  try {
    // Policy Signups (Main Collection)
    const policySignups = await PolicySignup.find().sort({ createdAt: -1 });
    const contactCount = policySignups.filter(s => s.type === 'contact').length;
    const newsletterCount = policySignups.filter(s => s.type === 'newsletter').length;
    
    console.log(`\n🎯 Main Collection (policysignups): ${policySignups.length} total`);
    console.log(`   📝 Contact submissions: ${contactCount}`);
    console.log(`   📧 Newsletter signups: ${newsletterCount}`);
    
    if (policySignups.length > 0) {
      console.log(`   🕒 Latest entry: ${policySignups[0].createdAt}`);
      console.log('\n   Recent entries:');
      policySignups.slice(0, 5).forEach((signup, i) => {
        console.log(`   ${i + 1}. ${signup.type === 'contact' ? '📝' : '📧'} ${signup.email} (${signup.createdAt.toLocaleDateString()})`);
      });
    }

    // Legacy Collections
    const legacyContacts = await ContactSubmission.find().sort({ createdAt: -1 });
    const legacyNewsletters = await NewsletterSignup.find().sort({ createdAt: -1 });
    
    console.log(`\n📂 Legacy Collections:`);
    console.log(`   📝 contactsubmissions: ${legacyContacts.length} entries`);
    console.log(`   📧 newslettersignups: ${legacyNewsletters.length} entries`);

    // Statistics
    console.log('\n📈 STATISTICS');
    console.log('=' .repeat(20));
    
    const stats = await PolicySignup.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          latest: { $max: '$createdAt' }
        }
      }
    ]);
    
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} entries (latest: ${stat.latest?.toLocaleDateString()})`);
    });

    // Unique emails
    const uniqueEmails = await PolicySignup.distinct('email');
    console.log(`Unique emails: ${uniqueEmails.length}`);

  } catch (error) {
    console.error('❌ Error reading data:', error.message);
  }
  
  mongoose.connection.close();
  console.log('\n✅ Data review complete');
}

displayData();
