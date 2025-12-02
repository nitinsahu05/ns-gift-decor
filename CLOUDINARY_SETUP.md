# ☁️ Cloudinary Image Upload Setup

## Why Cloudinary?
- ✅ Free tier: 25 GB storage, 25 GB bandwidth
- ✅ Works perfectly with Vercel
- ✅ Automatic image optimization
- ✅ CDN delivery
- ✅ Easy to use

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Cloudinary Account
```
1. Go to: https://cloudinary.com/users/register/free
2. Sign up (use email or GitHub)
3. Verify email
4. Login to dashboard
```

### Step 2: Get API Credentials
```
Dashboard → Settings → Product Environment Credentials

You'll see:
- Cloud Name: your-cloud-name
- API Key: 123456789012345
- API Secret: abcdefghijklmnopqrstuvwxyz
```

### Step 3: Add to Environment Variables

**Local (.env.local):**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
```

**Vercel:**
```
Dashboard → Settings → Environment Variables

Add these 3 variables:
1. NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
2. CLOUDINARY_API_KEY
3. CLOUDINARY_API_SECRET
```

---

## 📝 Implementation

Files to create/update:
1. Upload API route
2. Admin form component
3. Environment variables

---

## ✅ Benefits

**Before (Current):**
- ❌ File upload doesn't work on Vercel
- ❌ Need to use external image URLs
- ❌ Manual image hosting

**After (With Cloudinary):**
- ✅ Direct file upload from admin panel
- ✅ Automatic image optimization
- ✅ Fast CDN delivery
- ✅ Thumbnail generation
- ✅ Image transformations

---

**Ready to set up? Go to https://cloudinary.com/users/register/free** 🚀
