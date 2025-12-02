# ✅ Deployment Checklist

## Current Status
- [x] Code ready
- [x] Local development working
- [x] Prisma schema updated to PostgreSQL
- [ ] Database created
- [ ] Environment variables set
- [ ] Schema pushed to database
- [ ] Deployed to Vercel
- [ ] Verified working

---

## 🎯 Action Items

### 1. Create Database
**Choose one option:**

- [ ] **Option A: Supabase** (Recommended - Free forever)
  - [ ] Go to https://supabase.com/
  - [ ] Create account
  - [ ] New project: `ns-gift-decor`
  - [ ] Set password (save it!)
  - [ ] Copy connection string
  
- [ ] **Option B: Vercel Postgres**
  - [ ] Go to Vercel Dashboard
  - [ ] Storage → Create Database
  - [ ] Select Postgres
  - [ ] Copy connection string

### 2. Configure Vercel
- [ ] Open Vercel Dashboard
- [ ] Select project: `ns-gift-decor`
- [ ] Settings → Environment Variables
- [ ] Add `DATABASE_URL` with connection string
- [ ] Select all environments (Production, Preview, Development)
- [ ] Save

### 3. Update Local Environment
- [ ] Create/update `.env.local` file
- [ ] Add `DATABASE_URL` with connection string
- [ ] Or run: `npx vercel env pull .env.local`

### 4. Push Database Schema
```bash
- [ ] npx prisma db push
- [ ] npx prisma generate
```

### 5. Deploy
```bash
- [ ] git add .
- [ ] git commit -m "PostgreSQL setup for Vercel"
- [ ] git push origin main
```

### 6. Verify Deployment
- [ ] Check API: https://ns-gift-decor.vercel.app/api/products
- [ ] Check Admin: https://ns-gift-decor.vercel.app/admin
- [ ] Try adding a product
- [ ] Verify product appears in list

---

## 🔍 Verification Commands

```bash
# Check environment variables
vercel env ls

# Check Vercel logs
vercel logs

# Test database connection
npx prisma db push

# Test API locally
curl http://localhost:3000/api/products

# Test API on Vercel
curl https://ns-gift-decor.vercel.app/api/products
```

---

## 📝 Connection String Examples

### Supabase:
```
postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres
```

### Vercel Postgres:
```
postgresql://user:pass@host.vercel-storage.com:5432/db
```

### Railway:
```
postgresql://postgres:pass@containers-us-west-xxx.railway.app:5432/railway
```

---

## 🚨 Common Issues & Solutions

### Issue: "Can't reach database server"
**Solution:**
- Verify connection string is correct
- Check database is running
- For Supabase: Settings → Database → Connection pooling (use Transaction mode)

### Issue: "Prisma Client not generated"
**Solution:**
```bash
npx prisma generate
git add .
git commit -m "Update Prisma Client"
git push
```

### Issue: "Environment variable not found"
**Solution:**
```bash
vercel env pull .env.local
```

### Issue: "Migration failed"
**Solution:**
```bash
# Reset and push again
npx prisma db push --force-reset
```

---

## 📊 Files Changed

- [x] `prisma/schema.prisma` - Changed from sqlite to postgresql
- [x] `src/app/api/products/route.ts` - Removed SQLite-specific code
- [x] `src/app/api/upload/route.ts` - Added file upload support
- [x] `src/app/admin/page.tsx` - Added blob URL handling
- [x] `src/lib/db.ts` - Added connection logging

---

## 🎯 Success Criteria

✅ **Deployment is successful when:**
1. No 500 errors on Vercel
2. API returns data: `/api/products`
3. Admin panel loads without errors
4. Can add products successfully
5. Products persist after refresh
6. Images display correctly

---

## 📞 Support

**If stuck, check:**
1. Vercel logs: `vercel logs`
2. Browser console (F12)
3. Database connection: `npx prisma db push`
4. Environment variables: `vercel env ls`

**Documentation:**
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs
- Prisma: https://www.prisma.io/docs

---

## ⏱️ Estimated Time

- Database setup: 5 minutes
- Environment config: 2 minutes
- Schema push: 1 minute
- Deploy & verify: 3 minutes

**Total: ~11 minutes**

---

**Ready to deploy? Follow the checklist step by step!** 🚀
