import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bitcoin-policy-forms';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Unified Policy Signup Schema - stores both contact submissions and newsletter signups
const policySignupSchema = new mongoose.Schema({
  // Common fields
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['contact', 'newsletter'],
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  // Contact form specific fields (only for type: 'contact')
  name: {
    type: String,
    trim: true,
    required: function() { return this.type === 'contact'; }
  },
  organization: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true,
    required: function() { return this.type === 'contact'; }
  },
  
  // Additional metadata
  ipAddress: String,
  userAgent: String,
  source: {
    type: String,
    default: 'website'
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced'],
    default: 'active'
  }
});

// Create compound index for better query performance
policySignupSchema.index({ type: 1, createdAt: -1 });
policySignupSchema.index({ email: 1, type: 1 }, { unique: true });

// Models
const PolicySignup = mongoose.model('PolicySignup', policySignupSchema);

// Legacy schemas for backward compatibility (keeping separate collections)
const contactSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  organization: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const newsletterSignupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);
const NewsletterSignup = mongoose.model('NewsletterSignup', newsletterSignupSchema);

// Routes

// Contact form submission - saves to both legacy table and new policy_signup table
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, organization, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }
    
    // Get client metadata
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    // Save to legacy ContactSubmission collection
    const submission = new ContactSubmission({
      name,
      email,
      organization,
      message
    });
    await submission.save();
    
    // Save to new unified PolicySignup collection
    try {
      const policySignup = new PolicySignup({
        email,
        type: 'contact',
        name,
        organization,
        message,
        ipAddress,
        userAgent,
        source: 'website'
      });
      await policySignup.save();
    } catch (policyError) {
      // If duplicate email for contact type, update the existing record
      if (policyError.code === 11000) {
        await PolicySignup.findOneAndUpdate(
          { email, type: 'contact' },
          {
            name,
            organization,
            message,
            ipAddress,
            userAgent,
            createdAt: new Date()
          }
        );
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Contact submission saved successfully',
      data: submission
    });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save contact submission'
    });
  }
});

// Newsletter signup - saves to both legacy table and new policy_signup table
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }
    
    // Get client metadata
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    // Save to legacy NewsletterSignup collection
    let signup;
    try {
      signup = new NewsletterSignup({ email });
      await signup.save();
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Email already subscribed to newsletter'
        });
      }
      throw error;
    }
    
    // Save to new unified PolicySignup collection
    try {
      const policySignup = new PolicySignup({
        email,
        type: 'newsletter',
        ipAddress,
        userAgent,
        source: 'website'
      });
      await policySignup.save();
    } catch (policyError) {
      if (policyError.code === 11000) {
        // Email already exists for newsletter type - this is okay
        console.log(`Newsletter signup already exists in policy_signup for ${email}`);
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Newsletter signup saved successfully',
      data: signup
    });
  } catch (error) {
    console.error('Error saving newsletter signup:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save newsletter signup'
    });
  }
});

// Get all contact submissions (for admin)
app.get('/api/contact', async (req, res) => {
  try {
    const submissions = await ContactSubmission.find()
      .sort({ createdAt: -1 })
      .limit(100); // Limit to recent 100 submissions
    
    res.json({
      success: true,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submissions'
    });
  }
});

// Get all newsletter signups (for admin)
app.get('/api/newsletter', async (req, res) => {
  try {
    const signups = await NewsletterSignup.find()
      .sort({ createdAt: -1 })
      .limit(100); // Limit to recent 100 signups
    
    res.json({
      success: true,
      data: signups
    });
  } catch (error) {
    console.error('Error fetching newsletter signups:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch newsletter signups'
    });
  }
});

// New unified policy signup routes
// Get all policy signups with filtering
app.get('/api/policy-signups', async (req, res) => {
  try {
    const { type, limit = 100, page = 1, email } = req.query;
    
    // Build query
    const query = {};
    if (type && ['contact', 'newsletter'].includes(type)) {
      query.type = type;
    }
    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [signups, total] = await Promise.all([
      PolicySignup.find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .skip(skip),
      PolicySignup.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      data: signups,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching policy signups:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch policy signups'
    });
  }
});

// Get policy signup statistics
app.get('/api/policy-signups/stats', async (req, res) => {
  try {
    const stats = await PolicySignup.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          latest: { $max: '$createdAt' }
        }
      }
    ]);
    
    const totalStats = await PolicySignup.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          latestSignup: { $max: '$createdAt' }
        }
      }
    ]);
    
    // Get unique email count
    const uniqueEmails = await PolicySignup.distinct('email').then(emails => emails.length);
    
    res.json({
      success: true,
      data: {
        byType: stats.reduce((acc, stat) => {
          acc[stat._id] = {
            count: stat.count,
            latest: stat.latest
          };
          return acc;
        }, {}),
        total: totalStats[0]?.total || 0,
        uniqueEmails,
        latestSignup: totalStats[0]?.latestSignup
      }
    });
  } catch (error) {
    console.error('Error fetching policy signup stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch policy signup statistics'
    });
  }
});

// Delete all contact submissions (for admin)
app.delete('/api/contact', async (req, res) => {
  try {
    await ContactSubmission.deleteMany({});
    // Also delete contact type from policy signups
    await PolicySignup.deleteMany({ type: 'contact' });
    
    res.json({
      success: true,
      message: 'All contact submissions deleted'
    });
  } catch (error) {
    console.error('Error deleting contact submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact submissions'
    });
  }
});

// Delete all newsletter signups (for admin)
app.delete('/api/newsletter', async (req, res) => {
  try {
    await NewsletterSignup.deleteMany({});
    // Also delete newsletter type from policy signups
    await PolicySignup.deleteMany({ type: 'newsletter' });
    
    res.json({
      success: true,
      message: 'All newsletter signups deleted'
    });
  } catch (error) {
    console.error('Error deleting newsletter signups:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete newsletter signups'
    });
  }
});

// Delete all policy signups
app.delete('/api/policy-signups', async (req, res) => {
  try {
    const { type } = req.query;
    
    const query = {};
    if (type && ['contact', 'newsletter'].includes(type)) {
      query.type = type;
    }
    
    const result = await PolicySignup.deleteMany(query);
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} policy signups`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting policy signups:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete policy signups'
    });
  }
});

// Update policy signup status (for unsubscribing, etc.)
app.patch('/api/policy-signups/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['active', 'unsubscribed', 'bounced'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be active, unsubscribed, or bounced'
      });
    }
    
    const signup = await PolicySignup.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!signup) {
      return res.status(404).json({
        success: false,
        message: 'Policy signup not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Policy signup status updated',
      data: signup
    });
  } catch (error) {
    console.error('Error updating policy signup:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update policy signup'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
