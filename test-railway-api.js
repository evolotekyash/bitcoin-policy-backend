#!/usr/bin/env node

// Test script for Railway deployed API
// Usage: node test-railway-api.js YOUR_RAILWAY_URL

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function testAPI(baseUrl) {
  console.log(`🚂 Testing Railway API at: ${baseUrl}`);
  console.log('=' .repeat(50));

  // Test 1: Health Check
  console.log('\n1️⃣ Testing Health Check...');
  fetch(`${baseUrl}/api/health`)
    .then(response => response.json())
    .then(data => {
      console.log('✅ Health check passed:', data.message);
      console.log(`   Timestamp: ${data.timestamp}`);
    })
    .catch(error => {
      console.log('❌ Health check failed:', error.message);
    });

  // Test 2: Policy Signup Stats
  console.log('\n2️⃣ Testing Policy Signup Statistics...');
  fetch(`${baseUrl}/api/policy-signups/stats`)
    .then(response => response.json())
    .then(data => {
      console.log('✅ Stats endpoint working:', data.data);
    })
    .catch(error => {
      console.log('❌ Stats endpoint failed:', error.message);
    });

  // Test 3: Contact Form Submission
  console.log('\n3️⃣ Testing Contact Form Submission...');
  fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Railway Test User',
      email: 'test@railway-deployment.com',
      organization: 'Railway Testing',
      message: 'Testing Railway deployment - this is a test submission'
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('✅ Contact form submission successful');
        console.log(`   Message: ${data.message}`);
      } else {
        console.log('❌ Contact form submission failed:', data.message);
      }
    })
    .catch(error => {
      console.log('❌ Contact form submission failed:', error.message);
    });

  // Test 4: Newsletter Signup
  console.log('\n4️⃣ Testing Newsletter Signup...');
  fetch(`${baseUrl}/api/newsletter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'newsletter-test@railway-deployment.com'
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('✅ Newsletter signup successful');
        console.log(`   Message: ${data.message}`);
      } else {
        console.log('❌ Newsletter signup failed:', data.message);
      }
    })
    .catch(error => {
      console.log('❌ Newsletter signup failed:', error.message);
    });

  console.log('\n🎯 All tests initiated. Check results above.');
  console.log('\n📋 Next Steps:');
  console.log('1. If all tests pass, your Railway backend is working!');
  console.log('2. Update your frontend to use this Railway URL');
  console.log('3. Rebuild and redeploy your frontend');
  console.log('\n🔗 Your Railway API Base URL:', baseUrl);
}

// Get Railway URL from user
if (process.argv[2]) {
  const url = process.argv[2].replace(/\/$/, ''); // Remove trailing slash
  testAPI(url);
} else {
  rl.question('Enter your Railway URL (e.g., https://your-app.railway.app): ', (url) => {
    const cleanUrl = url.replace(/\/$/, ''); // Remove trailing slash
    testAPI(cleanUrl);
    rl.close();
  });
}
