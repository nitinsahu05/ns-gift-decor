# 🚀 GitHub Hosting Guide - Complete Setup

## Step 1: Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: N S GIFT & DECOR E-commerce"
```

## Step 2: Create GitHub Repository

### Option A: Via GitHub Website
```
1. Go to: https://github.com/
2. Login to your account
3. Click "+" (top right) → "New repository"
4. Repository name: ns-gift-decor
5. Description: "E-commerce website for N S GIFT & DECOR"
6. Choose: Public or Private
7. DON'T initialize with README (we already have code)
8. Click "Create repository"
```

### Option B: Via GitHub CLI (if installed)
```bash
gh repo create ns-gift-decor --public --source=. --remote=origin
```

## Step 3: Connect Local to GitHub

```bash
# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ns-gift-decor.git

# Verify remote
git remote -v

# Push code to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel (Free Hosting)

### Why Vercel?
- ✅ Free hosting
- ✅ Automatic deployments
- ✅ Custom domain support
- ✅ SSL certificate (HTTPS)
- ✅ Made for Next.js
- ✅ Fast CDN

### Deploy Steps:

**1. Go to Vercel**
```
Visit: https://vercel.com/
Click "Sign Up" or "Login"
Choose "Continue with GitHub"
```

**2. Import Repository**
```
Click "Add New..." → "Project"
Select "Import Git Repository"
Find "ns-gift-decor"
Click "Import"
```

**3. Configure Project**
```
Framework Preset: Next.js (auto-detected)
Root Directory: ./
Build Command: npm run build (auto-filled)
Output Directory: .next (auto-filled)
Install Command: npm install (auto-filled)
```

**4. Add Environment Variables**
```
Click "Environment Variables"
Add these:

Name: DATABASE_URL
Value: file:./db/custom.db

Name: NEXTAUTH_SECRET
Value: your-secret-key-here

Name: NEXT_PUBLIC_RAZORPAY_KEY_ID
Value: rzp_test_YOUR_KEY (or live key)

Name: RAZORPAY_KEY_SECRET
Value: YOUR_SECRET

Name: NEXT_PUBLIC_BUSINESS_NAME
Value: N S GIFT & DECOR

Name: NEXT_PUBLIC_BUSINESS_LOGO
Value: https://your-domain.vercel.app/logo.svg
```

**5. Deploy**
```
Click "Deploy"
Wait 2-3 minutes
Your site is live! 🎉
```

## Step 5: Get Your Live URL

```
After deployment:
- You'll get: https://ns-gift-decor.vercel.app
- Or custom domain: https://nsgiftdecor.com
```

## Step 6: Setup Custom Domain (Optional)

### Buy Domain:
```
1. Go to: https://www.godaddy.com/ or https://www.namecheap.com/
2. Search: nsgiftdecor.com
3. Purchase domain (₹500-1000/year)
```

### Connect to Vercel:
```
1. Vercel Dashboard → Your Project
2. Settings → Domains
3. Add Domain: nsgiftdecor.com
4. Follow DNS instructions
5. Wait 24-48 hours for propagation
6. Done! Your site is on custom domain
```

---

## Alternative: Deploy to Netlify

### Steps:
```
1. Go to: https://www.netlify.com/
2. Sign up with GitHub
3. Click "Add new site" → "Import existing project"
4. Choose GitHub → Select repository
5. Build settings:
   - Build command: npm run build
   - Publish directory: .next
6. Add environment variables
7. Deploy
8. Live at: https://ns-gift-decor.netlify.app
```

---

## Alternative: Deploy to Railway

### Steps:
```
1. Go to: https://railway.app/
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select repository
5. Add environment variables
6. Deploy
7. Live at: https://ns-gift-decor.up.railway.app
```

---

## Automatic Deployments

### How it Works:
```
1. You make changes locally
2. Commit: git commit -m "Updated products"
3. Push: git push
4. Vercel/Netlify automatically deploys
5. Live site updates in 2-3 minutes
```

### Example Workflow:
```bash
# Make changes
# Save files

# Commit changes
git add .
git commit -m "Added new products"

# Push to GitHub
git push

# Vercel automatically deploys
# Check: https://your-site.vercel.app
```

---

## Database Considerations

### Current Setup (SQLite):
```
⚠️ SQLite file won't persist on Vercel
Need to switch to cloud database
```

### Recommended: Switch to PostgreSQL

**Option 1: Vercel Postgres (Free tier)**
```
1. Vercel Dashboard → Storage → Create Database
2. Choose Postgres
3. Copy connection string
4. Update DATABASE_URL in environment variables
5. Update prisma/schema.prisma:
   provider = "postgresql"
6. Run: npx prisma db push
```

**Option 2: Supabase (Free)**
```
1. Go to: https://supabase.com/
2. Create project
3. Get database URL
4. Update DATABASE_URL
5. Update Prisma schema
6. Deploy
```

**Option 3: PlanetScale (Free)**
```
1. Go to: https://planetscale.com/
2. Create database
3. Get connection string
4. Update environment variables
5. Deploy
```

---

## Environment Variables Security

### Important:
```
✅ DO: Add to Vercel/Netlify dashboard
✅ DO: Keep .env.local in .gitignore
❌ DON'T: Commit .env files to GitHub
❌ DON'T: Share API keys publicly
```

### Check .gitignore:
```
# Should include:
.env*
.env.local
.env.production
```

---

## Post-Deployment Checklist

```
☐ Site is live and accessible
☐ All pages load correctly
☐ Images are displaying
☐ Products are showing
☐ Cart functionality works
☐ Checkout process works
☐ Admin panel accessible
☐ Payment gateway configured
☐ Database connected
☐ Environment variables set
☐ Custom domain connected (optional)
☐ SSL certificate active (HTTPS)
☐ Analytics added (optional)
```

---

## Monitoring & Analytics

### Add Google Analytics:
```
1. Go to: https://analytics.google.com/
2. Create property
3. Get tracking ID
4. Add to your site
```

### Vercel Analytics:
```
1. Vercel Dashboard → Analytics
2. Enable Analytics
3. View traffic, performance
```

---

## Updating Your Site

### Make Changes:
```bash
# 1. Make changes locally
# Edit files

# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Push to GitHub
git push

# 5. Vercel auto-deploys
# Wait 2-3 minutes
# Changes are live!
```

---

## Troubleshooting

### Build Failed?
```
Check Vercel logs:
1. Vercel Dashboard → Deployments
2. Click failed deployment
3. View logs
4. Fix errors
5. Push again
```

### Environment Variables Not Working?
```
1. Check spelling
2. Redeploy after adding variables
3. Use NEXT_PUBLIC_ prefix for client-side variables
```

### Database Not Working?
```
1. Switch to PostgreSQL
2. Update DATABASE_URL
3. Run migrations
4. Redeploy
```

---

## Cost Breakdown

### Free Tier (Recommended for Start):
```
✅ Vercel: Free (Hobby plan)
✅ GitHub: Free
✅ Supabase: Free (500MB database)
✅ Domain: ₹500-1000/year (optional)

Total: ₹0-1000/year
```

### Paid Tier (For Growth):
```
- Vercel Pro: $20/month
- Custom domain: ₹500-1000/year
- Database: $5-10/month
- Total: ~₹2000-3000/month
```

---

## Quick Commands Reference

```bash
# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "message"

# Add remote
git remote add origin https://github.com/username/repo.git

# Push
git push -u origin main

# Check status
git status

# View remotes
git remote -v

# Pull latest
git pull

# View logs
git log --oneline
```

---

## Support Resources

### Vercel:
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

### GitHub:
- Docs: https://docs.github.com/
- Support: https://support.github.com/

### Next.js:
- Docs: https://nextjs.org/docs
- Deploy: https://nextjs.org/docs/deployment

---

## 🎉 You're Ready to Deploy!

Follow the steps above and your site will be live in 10 minutes!

**Your Live URLs:**
- GitHub: https://github.com/YOUR_USERNAME/ns-gift-decor
- Live Site: https://ns-gift-decor.vercel.app
- Custom Domain: https://nsgiftdecor.com (optional)

Happy Hosting! 🚀
