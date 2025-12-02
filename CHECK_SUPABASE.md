# 🔍 Supabase Connection Issue

## ❌ Error
```
Can't reach database server at db.qbsxlyxgiqsukfnanp.supabase.co:5432
```

## 🔧 Possible Reasons

### 1. Database Still Setting Up
Supabase project create hone ke baad 2-3 minutes lagta hai fully setup hone mein.

**Solution:** 
- Supabase dashboard check karo
- Project status "Active" hona chahiye
- Wait karo 2-3 minutes aur retry karo

### 2. Wrong Connection String
Direct connection string ki jagah **Transaction Pooler** use karo.

**Steps:**
1. Supabase Dashboard → Database
2. Connection string section
3. **"Transaction"** tab select karo (not URI)
4. Copy karo
5. Use karo

Transaction pooler URL format:
```
postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres
```

### 3. Password Special Characters
Password mein special characters (`@`, `#`, `$`, etc.) URL encode karne padte hain:

```
@ → %40
# → %23
$ → %24
& → %26
+ → %2B
= → %3D
```

Tumhara password: `Nitin@02`
Encoded: `Nitin%4002` ✅ (already done)

### 4. Network/Firewall Issue
- VPN use kar rahe ho?
- Firewall blocking ho sakta hai
- Try different network

---

## ✅ Quick Fix Steps

### Option 1: Wait & Retry
```bash
# Wait 2-3 minutes
# Then retry:
npx prisma db push
```

### Option 2: Use Transaction Pooler
1. Supabase Dashboard kholo
2. Database → Connection string
3. **"Transaction"** tab select karo
4. Copy new URL
5. Update `.env.local`
6. Retry

### Option 3: Check Supabase Status
1. Supabase Dashboard
2. Project Overview
3. Check if "Status: Active"
4. Check if "Database: Healthy"

---

## 🎯 Next Steps

**Abhi kya karo:**

1. **Supabase Dashboard Check Karo:**
   - Project status dekho
   - Database healthy hai?
   - Green checkmark dikhai de raha hai?

2. **Transaction Pooler URL Try Karo:**
   - Database → Connection string
   - "Transaction" tab
   - Copy karo
   - `.env.local` mein update karo

3. **Wait & Retry:**
   - 2-3 minutes wait karo
   - `npx prisma db push` retry karo

---

**Batao:**
1. Supabase project status kya hai? (Active/Setting up)
2. Transaction pooler URL try karna hai?
3. Kitna time hua project create kiye?
