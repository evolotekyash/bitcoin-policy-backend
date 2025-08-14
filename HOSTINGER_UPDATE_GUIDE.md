# 🔄 Hostinger Update Guide - Existing Files

## 📋 Files to Update/Add

### Core Application Files (MUST UPDATE):
- `index.html` - Main application file with latest build
- `assets/index-CUToMqHJ.js` - JavaScript bundle (new hash)
- `assets/index-C73BDDBc.css` - CSS bundle (new hash)

### Configuration Files (IMPORTANT):
- `.htaccess` - Updated with security headers and routing rules

### Static Assets (ADD IF MISSING):
- All PDF files (Bitcoin regulatory documents)
- `bpi.jpeg` - Logo/image file
- `qrcode.png` - QR code image

## 🚨 Critical Update Steps

### Step 1: Backup Current Files
1. Login to Hostinger File Manager
2. Navigate to `public_html`
3. Select ALL files
4. Click "Compress" → Create ZIP backup
5. Download backup to your computer

### Step 2: Identify Old Asset Files
Look for OLD asset files in your current `assets/` folder:
- Files like: `index-XXXXXXXX.js` (different hash)
- Files like: `index-XXXXXXXX.css` (different hash)
- **These need to be DELETED** as they're outdated

### Step 3: Selective Update Process

#### Method A: Clean Update (Recommended)
```
1. Delete OLD assets folder: public_html/assets/
2. Upload NEW assets folder from deployment ZIP
3. Replace index.html with new version
4. Update .htaccess file
5. Add any missing PDF/image files
```

#### Method B: File-by-File Update
```
1. Replace index.html
2. Delete old assets/index-*.js and assets/index-*.css
3. Upload new assets/index-CUToMqHJ.js
4. Upload new assets/index-C73BDDBc.css
5. Update .htaccess
6. Add missing PDFs/images
```

## 📁 File Manager Actions

### Delete These Old Files:
- `assets/index-[OLD-HASH].js` (any old JavaScript bundle)
- `assets/index-[OLD-HASH].css` (any old CSS bundle)

### Upload These New Files:
- `index.html` (overwrites existing)
- `assets/index-CUToMqHJ.js` (new JavaScript)
- `assets/index-C73BDDBc.css` (new CSS)
- `.htaccess` (overwrites existing)

### Verify These Exist:
- All PDF files in root directory
- `bpi.jpeg` and `qrcode.png`

## ⚠️ Important Considerations

### Domain/Subdomain Settings:
- If you have custom domain settings, they won't be affected
- Your DNS and SSL settings remain unchanged

### Environment Issues:
- Your forms still won't work until backend is deployed
- Static content will work immediately after update

### Cache Clearing:
After update, clear browser cache or use:
- Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- Or open in incognito/private mode

## 🔧 Quick Update Commands

If you prefer terminal approach and have SSH access:

```bash
# Navigate to public_html
cd public_html

# Backup current files
tar -czf backup-$(date +%Y%m%d).tar.gz *

# Remove old assets
rm -rf assets/

# Extract new deployment (if uploading ZIP)
unzip hostinger-deployment-updated.zip
```

## ✅ Post-Update Checklist

- [ ] Website loads at your domain
- [ ] No 404 errors in browser console
- [ ] All navigation works
- [ ] PDFs are accessible
- [ ] CSS styling looks correct
- [ ] Mobile view works properly
- [ ] Old asset files removed from server

## 🆘 If Something Goes Wrong

1. **Website broken?** 
   - Restore from backup ZIP you created
   - Check browser console for specific errors

2. **Assets not loading?**
   - Verify asset file names match exactly
   - Check file permissions (644 for files, 755 for folders)

3. **Routing issues?**
   - Ensure `.htaccess` file is in root `public_html`
   - Check file doesn't have extra extensions like `.htaccess.txt`

---

**Safest approach:** Create backup first, then do a clean replacement of the assets folder and main files. This ensures no conflicts with old cached files.
