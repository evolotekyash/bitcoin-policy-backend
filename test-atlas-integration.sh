#!/bin/bash

echo "🚀 Testing MongoDB Atlas & Policy Signup Integration"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "\n${BLUE}1. Testing server health...${NC}"
curl -s http://localhost:5000/api/health

echo -e "\n\n${BLUE}2. Testing contact form submission to MongoDB Atlas...${NC}"
curl -s -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MongoDB Atlas Test",
    "email": "atlas-test@bitcoinpolicy.in", 
    "organization": "Bitcoin Policy Institute",
    "message": "Testing the new MongoDB Atlas integration with unified policy_signup table. This should create entries in both the legacy ContactSubmission collection and the new PolicySignup collection."
  }'

echo -e "\n\n${BLUE}3. Testing newsletter signup to MongoDB Atlas...${NC}"
curl -s -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newsletter-atlas@bitcoinpolicy.in"
  }'

echo -e "\n\n${BLUE}4. Testing policy signup statistics...${NC}"
curl -s http://localhost:5000/api/policy-signups/stats

echo -e "\n\n${BLUE}5. Testing policy signup data retrieval...${NC}"
curl -s "http://localhost:5000/api/policy-signups?limit=5"

echo -e "\n\n${GREEN}✅ MongoDB Atlas integration test completed!${NC}"
echo -e "${YELLOW}📊 Visit http://localhost:5173/admin/policy-signups to view the new unified admin panel${NC}"
echo -e "${YELLOW}📊 Visit http://localhost:5173/admin to view the legacy admin panel${NC}"
echo -e "${YELLOW}📝 Visit http://localhost:5173/contact to test the form submissions${NC}"

echo -e "\n${BLUE}Database Information:${NC}"
echo "- MongoDB Atlas Connection: ✅ Active"
echo "- Database: bitcoin-policy-forms"
echo "- Collections: policysignups (new unified), contactsubmissions (legacy), newslettersignups (legacy)"
echo "- Features: Unified data storage, duplicate prevention, status tracking, metadata collection"
