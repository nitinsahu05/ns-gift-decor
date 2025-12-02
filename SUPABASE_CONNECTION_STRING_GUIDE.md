# 🔗 Supabase Connection String Kaise Nikale

## Current Screen: Settings Page ✅

Ab ye steps follow karo:

### Step 1: Database Settings Mein Jao
```
Left sidebar mein dekho:
- Project Overview
- Table Editor
- SQL Editor
- Database  ← YE CLICK KARO
- Authentication
- Storage
...
```

### Step 2: Connection String Section
Database page par scroll down karo, dikhai dega:
```
Connection string
- Session mode
- Transaction mode  ← YE SELECT KARO (recommended for Prisma)
- URI  ← YE SELECT KARO
```

### Step 3: Copy Connection String
```
1. "URI" tab select karo
2. Copy button click karo
3. Connection string kuch aisa hoga:

postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres

Ya:

postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres
```

### Step 4: Password Replace Karo
```
Connection string mein [YOUR-PASSWORD] ya YOUR_PASSWORD dikhai dega
Isko replace karo apne actual password se jo tumne project create karte waqt set kiya tha

Example:
Before: postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres
After:  postgresql://postgres:MyStr0ngP@ss@db.xxx.supabase.co:5432/postgres
```

---

## 🎯 Quick Navigation

**Abhi tum yahan ho:** Settings → (koi specific section)

**Jahan jana hai:** Database → Connection string → URI

**Steps:**
1. Left sidebar → "Database" click karo
2. Scroll down → "Connection string" section
3. "URI" tab select karo (ya "Transaction" mode)
4. Copy button click karo
5. Password replace karo

---

## 🔐 Password Bhool Gaye?

Agar password yaad nahi:
1. Settings → Database
2. "Reset database password" button click karo
3. New password set karo
4. Save karo
5. Ye new password use karo connection string mein

---

## ✅ Connection String Example

```env
# Supabase Connection String Format:
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.qbsxlyxgiqsukfnanp.supabase.co:5432/postgres"

# Transaction Mode (Recommended for Prisma):
DATABASE_URL="postgresql://postgres.qbsxlyxgiqsukfnanp:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
```

---

## 📸 Visual Guide

```
Supabase Dashboard
├── Left Sidebar
│   ├── Project Overview
│   ├── Table Editor
│   ├── SQL Editor
│   ├── Database  ← CLICK HERE
│   │   ├── Tables
│   │   ├── Roles
│   │   ├── Extensions
│   │   ├── Replication
│   │   └── Connection string  ← SCROLL TO THIS
│   │       ├── Session mode
│   │       ├── Transaction mode  ← USE THIS
│   │       └── URI  ← OR THIS
│   ├── Authentication
│   └── Storage
```

---

**Next:** Connection string copy karne ke baad batao! 🚀
