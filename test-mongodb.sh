#!/bin/bash

echo "Testing MongoDB Form Storage Integration..."
echo "=========================================="

# Test server health
echo "1. Testing server health..."
curl -s http://localhost:5000/api/health | jq '.' || echo "Server not responding"

echo -e "\n2. Testing contact form submission..."
curl -s -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "organization": "Test Organization",
    "message": "This is a test message to verify MongoDB integration is working correctly."
  }' | jq '.' || echo "Contact submission failed"

echo -e "\n3. Testing newsletter signup..."
curl -s -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newsletter@example.com"
  }' | jq '.' || echo "Newsletter signup failed"

echo -e "\n4. Fetching all contact submissions..."
curl -s http://localhost:5000/api/contact | jq '.data | length' | xargs echo "Total contact submissions:"

echo -e "\n5. Fetching all newsletter signups..."
curl -s http://localhost:5000/api/newsletter | jq '.data | length' | xargs echo "Total newsletter signups:"

echo -e "\nMongoDB integration test completed!"
echo "Visit http://localhost:5173/admin to view the admin panel"
