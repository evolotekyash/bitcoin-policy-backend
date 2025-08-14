# 🚂 Railway Deployment Checklist

## ✅ Completed Steps
- [x] Backend files pushed to GitHub
- [x] Git repository connected to Railway
- [x] Local backend tested and working
- [x] MongoDB Atlas connection verified

## 🎯 IN PROGRESS: Railway Deployment

### 1. Railway Project Setup
- [ ] Go to [Railway Dashboard](https://railway.app/dashboard) ⬅️ **DO THIS NOW**
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Choose `bitcoin-policy-backend` repository
- [ ] Confirm Railway detects Node.js project

### 2. Configure Build Settings
- [ ] Set **Root Directory** to `server` (if not auto-detected)
- [ ] Confirm **Start Command** is `npm start`
- [ ] Confirm **Install Command** is `npm install`

### 3. Environment Variables
Add these in Railway **Variables** tab:
- [ ] `MONGODB_URI` = `mongodb+srv://gandhiyaash:100xDev2024@cluster0.ztwrafd.mongodb.net/bitcoin-policy-forms?retryWrites=true&w=majority&appName=Cluster0`
- [ ] `NODE_ENV` = `production` (optional but recommended)

### 4. Deploy & Test
- [ ] Wait for Railway deployment to complete
- [ ] Note your Railway URL (e.g., `https://your-app.railway.app`)
- [ ] Test using: `node test-railway-api.js YOUR_RAILWAY_URL`

### 5. Update Frontend Configuration
- [ ] Create/update `.env.production` with Railway URL
- [ ] Rebuild frontend: `npm run build`
- [ ] Redeploy frontend to Hostinger

## 🔗 Your Current URLs
- **GitHub Repo**: https://github.com/evolotekyash/bitcoin-policy-backend
- **Railway URL**: [Will be provided after deployment]
- **Frontend**: [Your Hostinger URL]

## 🚨 Important Notes
- Your server is configured to run on `process.env.PORT || 5000`
- CORS is enabled for all origins (`app.use(cors())`)
- MongoDB connection string is already configured
- All API endpoints are ready: `/api/health`, `/api/contact`, `/api/newsletter`, `/api/policy-signups`

## 🎯 Success Indicators
When deployment is successful, you should see:
1. ✅ Build completed without errors
2. ✅ Health check returns 200 at `/api/health`
3. ✅ MongoDB connection established
4. ✅ All API endpoints responding

## 📞 Need Help?
If you encounter issues:
1. Check Railway build logs for errors
2. Verify environment variables are set correctly
3. Test MongoDB connection string separately
4. Use the test script to verify all endpoints

---
**Ready to deploy!** 🚀
