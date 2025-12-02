# 🔗 Transaction Pooler URL Kaise Nikale

## Current Screen: Project Overview ✅

Ab ye steps follow karo:

### Step 1: Database Section Mein Jao
```
Left sidebar mein:
- Home (currently here)
- Table Editor
- SQL Editor
- Database  ← YE CLICK KARO
```

### Step 2: Connection Pooling Section
Database page par scroll down karo, dikhai dega:
```
Connection Pooling
- Mode: Transaction
- Host: aws-0-ap-south-1.pooler.supabase.com
- Port: 6543
```

### Step 3: Connection String
Neeche "Connection string" section mein:
```
Tabs:
- Session mode
- Transaction mode  ← YE SELECT KARO
- URI
```

### Step 4: Copy Connection String
Transaction mode tab mein connection string hoga:
```
postgresql://postgres.qbsxlyxgiqsukfnanp:Nitin@02@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
```

Key differences from direct connection:
- Port: 6543 (not 5432)
- Host: pooler.supabase.com (not db.supabase.co)
- Username: postgres.PROJECT_REF (not just postgres)

---

## 🎯 Quick Navigation

**From current screen:**
1. Left sidebar → "Database" click karo
2. Scroll down → "Connection Pooling" section
3. "Connection string" → "Transaction" tab
4. Copy button click karo

---

**Batao jab Transaction URL mil jaye!** 🚀
