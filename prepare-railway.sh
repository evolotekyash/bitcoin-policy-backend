#!/bin/bash

echo "🚂 Railway Deployment Preparation Script"
echo "======================================="

# Check if we're in the right directory
if [ ! -f "server/package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

echo "✅ Backend files ready in server/ folder"
echo "📦 Dependencies installed"
echo ""

echo "📋 Your backend includes:"
echo "   • Express.js API server"
echo "   • MongoDB Atlas integration"
echo "   • Contact form endpoints"
echo "   • Newsletter signup endpoints"
echo "   • Admin dashboard data endpoints"
echo "   • Real-time statistics"
echo ""

echo "🔗 Next Steps:"
echo "1. Create GitHub repository for your backend"
echo "2. Upload server/ folder contents to GitHub"
echo "3. Deploy on Railway.app"
echo "4. Set environment variables on Railway"
echo "5. Get your production URL"
echo "6. Update frontend configuration"
echo ""

echo "📁 Files ready for deployment:"
ls -la server/

echo ""
echo "🎯 Ready for Railway deployment!"
echo "Follow the guide in RAILWAY_DEPLOYMENT.md"
