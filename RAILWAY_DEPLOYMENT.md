# 🚂 Railway Deployment Guide

## 🎯 Step-by-Step Railway Deployment

### Step 1: Prepare for Railway
1. **Sign up at [Railway.app](https://railway.app)**
2. **Connect your GitHub account**
3. **Create a new repository** for your backend (or use existing one)

### Step 2: Upload Backend to GitHub

#### Option A: Create New Repository
1. Go to [GitHub.com](https://github.com)
2. Create new repository: `bitcoin-policy-backend`
3. Clone it locally
4. Copy your `server/` folder contents to the repo
5. Push to GitHub

#### Option B: Use Existing Repository
1. Create a `backend/` folder in your existing repo
2. Move `server/` contents to `backend/`
3. Push to GitHub

### Step 3: Deploy on Railway

1. **Login to Railway.app**
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your repository**
5. **Select the folder** containing your backend code

### Step 4: Configure Environment Variables

In Railway dashboard:
1. Go to **Variables** tab
2. Add these environment variables:
   ```
   MONGODB_URI=mongodb+srv://gandhiyaash:100xDev2024@cluster0.ztwrafd.mongodb.net/bitcoin-policy-forms?retryWrites=true&w=majority&appName=Cluster0
   PORT=8080
   ```

### Step 5: Get Your Production URL

After deployment completes:
1. Railway will provide a URL like: `https://your-app-name.railway.app`
2. Test the API: `https://your-app-name.railway.app/api/health`

### Step 6: Update Frontend Configuration

Update your frontend to use the Railway URL:

1. **Update `.env.production`**:
   ```
   VITE_API_BASE_URL=https://your-app-name.railway.app/api
   ```

2. **Rebuild frontend**:
   ```bash
   npm run build
   ```

3. **Create new deployment ZIP**:
   ```bash
   cd dist && zip -r ../hostinger-deployment-final.zip . -x "*.DS_Store"
   ```

4. **Upload to Hostinger** (replace existing files)

## 🔧 Quick Commands

### Local Testing
```bash
cd server
npm install
npm start
```

### Build & Deploy Frontend
```bash
# Update environment
echo 'VITE_API_BASE_URL=https://your-railway-url.railway.app/api' > .env.production

# Build
npm run build

# Package for Hostinger
cd dist && zip -r ../hostinger-deployment-final.zip . -x "*.DS_Store"
```

## 🚨 Important Notes

### CORS Configuration
Your backend is already configured to accept requests from any origin with:
```javascript
app.use(cors());
```

### MongoDB Atlas
- Your connection string is already configured
- No additional setup needed

### Port Configuration
- Railway automatically assigns PORT environment variable
- Your server listens on `process.env.PORT || 5000`

## ✅ Success Checklist

- [ ] Railway account created
- [ ] Backend repository on GitHub
- [ ] Railway project deployed
- [ ] Environment variables set
- [ ] API health check returns 200
- [ ] Frontend updated with Railway URL
- [ ] Frontend rebuilt and redeployed
- [ ] Forms working on live website

## 🔗 Testing Your Deployment

1. **API Health Check**:
   ```
   GET https://your-app.railway.app/api/health
   ```

2. **Test Form Submission**:
   ```bash
   curl -X POST https://your-app.railway.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

3. **Test Statistics**:
   ```
   GET https://your-app.railway.app/api/policy-signups/stats
   ```

Once deployed, your forms on the live website will work with real-time data!

---

**Ready to deploy?** Follow the steps above and your backend will be live on Railway with real-time form submissions!
