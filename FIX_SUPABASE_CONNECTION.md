# 🔧 Supabase Connection Fix

## ❌ Error
```
Can't reach database server at 'db.qbselyfvgicukdtaiap.supabase.co:5432'
```

## 🎯 Solution: Use IPv6 Pooler

Supabase ne direct connection disable kar diya. **Pooler connection** use karna hoga.

### Option 1: Enable Connection Pooling (Recommended)

1. **Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Select project: ns-gift-decor

2. **Settings → Database:**
   - Scroll to "Connection Pooling"
   - Click "Enable Pooling"

3. **Get Pooler Connection String:**
   - Mode: Transaction
   - Copy connection string
   - Format: `postgresql://postgres.PROJECT:PASSWORD@aws-0-region.pooler.supabase.com:6543/postgres`

4. **Update Vercel Environment Variable:**
   - Vercel Dashboard → Settings → Environment Variables
   - Edit DATABASE_URL
   - Paste new pooler connection string
   - Save

### Option 2: Use Supavisor (IPv6 Pooler)

If pooling not available, use IPv6 direct connection:

**Connection String Format:**
```
postgresql://postgres:PASSWORD@db.qbselyfvgicukdtaiap.supabase.co:6543/postgres?pgbouncer=true
```

Add `?pgbouncer=true` at the end.

### Option 3: Use Alternative Database

If Supabase not working, try:

#### A. Neon Database (Free, Serverless PostgreSQL)
```
1. https://neon.tech/
2. Sign up
3. Create project
4. Copy connection string
5. Add to Vercel
```

#### B. Railway (Free tier)
```
1. https://railway.app/
2. New Project → PostgreSQL
3. Copy connection string
4. Add to Vercel
```

---

## 🚀 Quick Fix (Try This First)

### Update Vercel Environment Variable:

**Current (not working):**
```
postgresql://postgres:Nitin%4002@db.qbselyfvgicukdtaiap.supabase.co:5432/postgres
```

**Try this (with pgbouncer):**
```
postgresql://postgres:Nitin%4002@db.qbselyfvgicukdtaiap.supabase.co:6543/postgres?pgbouncer=true
```

**Or this (IPv6 pooler):**
```
postgresql://postgres.qbselyfvgicukdtaiap:Nitin%4002@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

---

## 📝 Steps to Update

1. **Vercel Dashboard:**
   ```
   https://vercel.com/dashboard
   → ns-gift-decor
   → Settings
   → Environment Variables
   → Edit DATABASE_URL
   ```

2. **Update Value:**
   ```
   postgresql://postgres:Nitin%4002@db.qbselyfvgicukdtaiap.supabase.co:6543/postgres?pgbouncer=true
   ```

3. **Save & Redeploy:**
   - Click Save
   - Deployments → Latest → Redeploy

---

## 🎯 Alternative: Use Neon (Easiest)

Neon is serverless PostgreSQL, perfect for Vercel:

1. **Sign up:** https://neon.tech/
2. **Create project:** ns-gift-decor
3. **Copy connection string**
4. **Add to Vercel**
5. **Redeploy**

**Done in 2 minutes!** ✅

---

**Which option do you want to try?**
1. Enable Supabase pooling
2. Try pgbouncer URL
3. Switch to Neon database
