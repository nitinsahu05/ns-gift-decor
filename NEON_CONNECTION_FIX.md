# 🔧 Neon Connection Fix

## Issue
Pooler connection not working from local machine.

## Solution: Use Direct Connection

### Step 1: Get Direct Connection String

Neon Dashboard:
1. Click "Connect" button
2. **Turn OFF** "Connection pooling" toggle (green switch)
3. Copy the new connection string

**Direct connection format:**
```
postgresql://neondb_owner:password@ep-xxx.region.aws.neon.tech:5432/neondb?sslmode=require
```

**Pooled connection format (current - not working locally):**
```
postgresql://neondb_owner:password@ep-xxx-pooler.region.aws.neon.tech:5432/neondb?sslmode=require
```

**Notice:** Direct connection doesn't have `-pooler` in hostname.

### Step 2: Update .env Files

Use direct connection for local development.

### Step 3: For Vercel

Vercel par pooled connection use karo (better for serverless).

---

## Quick Fix

**Go back to Neon dashboard:**
1. Click "Connect" button again
2. **Toggle OFF** "Connection pooling" (make it gray)
3. Copy new connection string
4. Share it here

**Or:**

Just use pooled connection on Vercel (it will work there even if not working locally).

---

**Batao: Direct connection string kya hai?** 🔍
