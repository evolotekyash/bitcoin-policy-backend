#!/bin/bash

echo "🔄 Adding Test Data to MongoDB Atlas..."
echo "====================================="

# Test data arrays
contact_submissions=(
  '{"name": "Dr. Rajesh Kumar", "email": "rajesh.kumar@rbi.gov.in", "organization": "Reserve Bank of India", "message": "Inquiry about Bitcoin Policy recommendations for India. We are reviewing digital currency regulations."}'
  '{"name": "Sarah Chen", "email": "sarah.chen@fintech.sg", "organization": "Singapore FinTech Association", "message": "Interested in collaborating on Bitcoin mining regulatory framework research."}'
  '{"name": "Michael Thompson", "email": "m.thompson@goldmansachs.com", "organization": "Goldman Sachs", "message": "Would like to discuss Bitcoin strategic reserve implementation for institutional investors."}'
  '{"name": "Prof. Anita Sharma", "email": "anita.sharma@iitdelhi.ac.in", "organization": "IIT Delhi", "message": "Academic research collaboration on Bitcoin mining economic impact analysis."}'
  '{"name": "James Wilson", "email": "james@bitcoinminer.co", "organization": "Bitcoin Mining Corp", "message": "Seeking guidance on regulatory compliance for Bitcoin mining operations in India."}'
)

newsletter_emails=(
  "policy.updates@ministry.gov.in"
  "crypto.research@mit.edu"
  "blockchain@stanford.edu"
  "digital.currency@fed.gov"
  "bitcoin.analysis@reuters.com"
  "fintech.news@bloomberg.com"
  "crypto.investor@blackrock.com"
  "policy.tracker@coindesk.com"
)

echo "📝 Adding Contact Submissions..."
for i in "${!contact_submissions[@]}"; do
  echo "Adding contact submission $((i+1))..."
  response=$(curl -s -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d "${contact_submissions[$i]}")
  
  if [[ $response == *"success"* ]]; then
    echo "✅ Contact submission $((i+1)) added successfully"
  else
    echo "❌ Failed to add contact submission $((i+1)): $response"
  fi
  sleep 1
done

echo -e "\n📧 Adding Newsletter Signups..."
for i in "${!newsletter_emails[@]}"; do
  echo "Adding newsletter signup $((i+1))..."
  response=$(curl -s -X POST http://localhost:5000/api/newsletter \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"${newsletter_emails[$i]}\"}")
  
  if [[ $response == *"success"* ]]; then
    echo "✅ Newsletter signup $((i+1)) added successfully"
  else
    echo "❌ Failed to add newsletter signup $((i+1)): $response"
  fi
  sleep 1
done

echo -e "\n📊 Getting Statistics..."
stats=$(curl -s http://localhost:5000/api/policy-signups/stats)
echo "Stats: $stats"

echo -e "\n🎉 Test data addition completed!"
echo "📱 View data at:"
echo "   - Legacy Admin: http://localhost:5173/admin"
echo "   - New Admin: http://localhost:5173/admin/policy-signups"
echo "   - Contact Form: http://localhost:5173/contact"
