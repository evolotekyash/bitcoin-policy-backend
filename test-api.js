import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5001/api';

async function testAPI() {
  console.log('🔍 Testing MongoDB Atlas Integration...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test 2: Add Contact Submission
    console.log('\n2. Adding contact submission...');
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      organization: 'Test Organization',
      message: 'This is a test message for MongoDB Atlas integration.'
    };
    
    const contactResponse = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    
    const contactResult = await contactResponse.json();
    console.log('✅ Contact submission:', contactResult);

    // Test 3: Add Newsletter Signup
    console.log('\n3. Adding newsletter signup...');
    const newsletterResponse = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'newsletter@example.com' })
    });
    
    const newsletterResult = await newsletterResponse.json();
    console.log('✅ Newsletter signup:', newsletterResult);

    // Test 4: Get Statistics
    console.log('\n4. Getting policy signup statistics...');
    const statsResponse = await fetch(`${API_BASE}/policy-signups/stats`);
    const statsData = await statsResponse.json();
    console.log('✅ Statistics:', statsData);

    // Test 5: Get All Data
    console.log('\n5. Getting all policy signups...');
    const dataResponse = await fetch(`${API_BASE}/policy-signups`);
    const allData = await dataResponse.json();
    console.log('✅ All data:', allData);

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

testAPI();
