# 🚀 Vercel Database Setup Guide

## ❌ Current Problem
- SQLite file-based database Vercel par work nahi karta
- 500 Internal Server Error aa raha hai
- Database persist nahi ho raha

## ✅ Solution: Vercel Postgres

### Step 1: Create Vercel Postgres Database

1. **Vercel Dashboard kholo:**
   - https://vercel.com/dashboard
   - Apna project select karo: `ns-gift-decor`

2. **Storage Tab:**
   - Click on "Storage" tab
   - Click "Create Database"
   - Select "Postgres"

3. **Database Create:**
   - Database Name: `ns-gift-decor-db`
   - Region: Select closest to you (e.g., Mumbai/Singapore)
   - Click "Create"

4. **Connection String Copy:**
   - Database create hone ke baad
   - `.env.local` tab click karo
   - Copy karo `DATABASE_URL`
   - Example:
   ```
   DATABASE_URL="postgresql://user:pass@host.vercel-storage.com:5432/db"
   ```

### Step 2: Update Environment Variables

1. **Vercel Dashboard:**
   - Settings → Environment Variables
   - Add new variable:
     - Name: `DATABASE_URL`
     - Value: (paste copied connection string)
     - Environment: Production, Preview, Development (all select karo)
   - Click "Save"

### Step 3: Update Prisma Schema

Schema already update kar diya hai (neeche dekho)

### Step 4: Deploy Database Schema

Local se run karo:
```bash
# Install Vercel CLI (agar nahi hai)
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.local

# Push database schema
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### Step 5: Redeploy

```bash
# Commit changes
git add .
git commit -m "Switch to PostgreSQL for Vercel"
git push

# Or manual deploy
vercel --prod
```

---

## 🎯 Alternative: Supabase (Free Forever)

Agar Vercel Postgres nahi chahiye, toh Supabase use karo:

### Step 1: Create Supabase Account
1. Go to: https://supabase.com/
2. Sign up (GitHub se login kar sakte ho)
3. Create New Project:
   - Name: `ns-gift-decor`
   - Database Password: (strong password set karo)
   - Region: Mumbai/Singapore
   - Click "Create Project"

### Step 2: Get Connection String
1. Project Settings → Database
2. Connection String → URI
3. Copy karo (password replace karo)
4. Example:
   ```
   postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres
   ```

### Step 3: Add to Vercel
1. Vercel Dashboard → Settings → Environment Variables
2. Add `DATABASE_URL` with Supabase connection string
3. Save

### Step 4: Deploy Schema
```bash
# Update .env.local with Supabase URL
DATABASE_URL="postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres"

# Push schema
npx prisma db push

# Redeploy
git push
```

---

## 📝 Quick Commands

```bash
# 1. Update environment
vercel env pull .env.local

# 2. Push database schema
npx prisma db push

# 3. Generate Prisma client
npx prisma generate

# 4. Seed database (optional)
npm run seed

# 5. Deploy
vercel --prod
```

---

## 🔍 Verify Deployment

After deployment:
1. Check Vercel logs: `vercel logs`
2. Test API: `https://ns-gift-decor.vercel.app/api/products`
3. Admin panel: `https://ns-gift-decor.vercel.app/admin`

---

## ⚡ Quick Fix (5 minutes)

**Fastest way:**

1. **Supabase:**
   - Create account → New project → Copy connection string

2. **Vercel:**
   - Settings → Environment Variables → Add `DATABASE_URL`

3. **Local:**
   ```bash
   vercel env pull .env.local
   npx prisma db push
   git push
   ```

4. **Done!** ✅

---

## 🆘 Troubleshooting

### Error: "Can't reach database server"
- Check connection string
- Verify database is running
- Check IP whitelist (Supabase: allow all IPs)

### Error: "Prisma Client not generated"
```bash
npx prisma generate
git add .
git commit -m "Update Prisma Client"
git push
```

### Error: "Environment variable not found"
```bash
vercel env pull .env.local
```

---

**Choose one:**
- ✅ Vercel Postgres (Recommended for Vercel projects)
- ✅ Supabase (Free forever, easy setup)

Both work perfectly! 🚀
