# 🚀 Vercel Environment Variable Setup

## Local Connection Issue

Local se Supabase connect nahi ho pa raha. Koi baat nahi!

**Solution:** Direct Vercel par environment variable set karo aur deploy karo.

---

## ✅ Steps to Deploy

### 1. Vercel Dashboard Mein Environment Variable Add Karo

```
1. https://vercel.com/dashboard
2. Project select karo: ns-gift-decor
3. Settings → Environment Variables
4. Add New:
   
   Key: DATABASE_URL
   Value: postgresql://postgres:Nitin%4002@db.qbselyfvgicukdtaiap.supabase.co:5432/postgres
   
   Environments: Production, Preview, Development (all check karo)
5. Save
```

### 2. Commit & Push Code

```bash
git add .
git commit -m "Switch to PostgreSQL for Vercel deployment"
git push origin main
```

### 3. Vercel Auto-Deploy Karega

- Push karne ke baad Vercel automatically deploy karega
- Deployment mein Prisma automatically schema push karega
- 2-3 minutes mein live ho jayega

### 4. Verify Deployment

```
1. https://ns-gift-decor.vercel.app/api/products
   Should return: [] (empty array, no 500 error)

2. https://ns-gift-decor.vercel.app/admin
   Should load without errors

3. Add a product and verify it works
```

---

## 🎯 Connection String for Vercel

**Use this in Vercel Environment Variables:**

```
DATABASE_URL=postgresql://postgres:Nitin%4002@db.qbselyfvgicukdtaiap.supabase.co:5432/postgres
```

**Important:**
- Password mein `@` symbol ko `%40` se replace kiya hai
- Vercel par yeh automatically kaam karega
- Local development ke liye SQLite use kar sakte ho

---

## 📝 Alternative: Keep SQLite for Local

Agar local development ke liye SQLite rakhna hai:

### Create `.env.local` for local development:
```env
DATABASE_URL="file:./db/custom.db"
```

### Keep `.env` for production:
```env
DATABASE_URL="postgresql://postgres:Nitin%4002@db.qbselyfvgicukdtaiap.supabase.co:5432/postgres"
```

### Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Keep this for Vercel
  url      = env("DATABASE_URL")
}
```

---

## ✅ Quick Deploy Commands

```bash
# 1. Commit changes
git add .
git commit -m "PostgreSQL setup for Vercel"

# 2. Push to deploy
git push origin main

# 3. Check deployment status
vercel logs

# 4. Test API
curl https://ns-gift-decor.vercel.app/api/products
```

---

## 🔍 Troubleshooting

### If Vercel deployment fails:

1. **Check Vercel logs:**
   ```bash
   vercel logs
   ```

2. **Verify environment variable:**
   - Vercel Dashboard → Settings → Environment Variables
   - DATABASE_URL should be there

3. **Redeploy:**
   ```bash
   vercel --prod
   ```

---

**Ready to deploy?** Just push to GitHub! 🚀
