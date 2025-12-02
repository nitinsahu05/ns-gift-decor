# ☁️ Cloudinary Setup - Step by Step

## 🎯 Do This Now:

### Step 1: Create Cloudinary Account (2 minutes)

1. **Open:** https://cloudinary.com/users/register/free
2. **Sign up** with email or GitHub
3. **Verify email** (check inbox)
4. **Login** to dashboard

---

### Step 2: Get Your Credentials (1 minute)

After login, you'll see dashboard:

1. Look for **"Product Environment Credentials"** section
2. You'll see 3 values:
   ```
   Cloud Name: xxxxx
   API Key: 123456789012345
   API Secret: abcdefghijklmnopqrstuvwxyz
   ```
3. **Copy these values** (keep them safe!)

---

### Step 3: Add to Local Environment (30 seconds)

Update `.env.local` file:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Existing Neon Database
DATABASE_URL="postgresql://neondb_owner:npg_g9dyjqb5Ckwr@ep-fancy-mountain-a49wmzoj.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

---

### Step 4: Add to Vercel (1 minute)

1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **Select:** ns-gift-decor
3. **Settings → Environment Variables**
4. **Add 3 new variables:**

```
Name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
Value: your-cloud-name
Environments: Production, Preview, Development

Name: CLOUDINARY_API_KEY
Value: your-api-key
Environments: Production, Preview, Development

Name: CLOUDINARY_API_SECRET
Value: your-api-secret
Environments: Production, Preview, Development
```

5. **Save**

---

### Step 5: Deploy (1 minute)

```bash
git add .
git commit -m "Add Cloudinary image upload"
git push origin main
```

---

## ✅ After Deployment

### Test File Upload:

1. **Go to:** https://ns-gift-decor.vercel.app/admin
2. **Click:** Add Product
3. **Choose File:** Select an image
4. **Fill details** and click Add Product
5. **Image will upload to Cloudinary** and display! ✅

---

## 🎉 Benefits

**Now you can:**
- ✅ Upload images directly from admin panel
- ✅ Images stored on Cloudinary CDN
- ✅ Automatic optimization
- ✅ Fast loading
- ✅ No Vercel storage issues

---

## 📊 Cloudinary Free Tier

- **Storage:** 25 GB
- **Bandwidth:** 25 GB/month
- **Transformations:** 25,000/month
- **Perfect for small to medium projects!**

---

## 🔧 Troubleshooting

### Error: "Invalid credentials"
- Check cloud name, API key, API secret
- Make sure no extra spaces
- Verify in Cloudinary dashboard

### Error: "Upload failed"
- Check file size (max 10MB on free tier)
- Check file format (JPG, PNG, GIF, WebP supported)
- Check Cloudinary dashboard for quota

---

**Total time: ~5 minutes** ⏱️

**Start here:** https://cloudinary.com/users/register/free 🚀
