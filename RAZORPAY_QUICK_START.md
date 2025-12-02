# 🚀 Razorpay Quick Start Guide

## Step-by-Step Setup (5 Minutes)

### 1️⃣ Create Razorpay Account
```
1. Visit: https://razorpay.com/
2. Click "Sign Up" (Top right)
3. Enter:
   - Email
   - Password
   - Business Name: "N S GIFT & DECOR"
4. Verify email
5. Login to Dashboard
```

### 2️⃣ Get Test API Keys
```
1. Go to: https://dashboard.razorpay.com/app/keys
2. Click "Generate Test Keys"
3. You'll see:
   - Key ID: rzp_test_XXXXXXXXXXXXX
   - Key Secret: YYYYYYYYYYYYYYYY
4. Copy both keys
```

### 3️⃣ Add Keys to Your Project
```
1. Open file: .env.local
2. Replace these lines:
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
   RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE

3. Paste your actual keys:
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXX
   RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYY
```

### 4️⃣ Install Razorpay Package
```bash
npm install razorpay
```

### 5️⃣ Restart Server
```bash
# Stop current server (Ctrl+C)
# Start again
npm run dev
```

### 6️⃣ Test Payment
```
1. Go to: http://localhost:3000
2. Add products to cart
3. Go to checkout
4. Select "Credit / Debit Card"
5. Fill customer details
6. Click "Complete Payment"
7. Razorpay popup will open
8. Use test card:
   - Card Number: 4111 1111 1111 1111
   - Expiry: Any future date (e.g., 12/25)
   - CVV: Any 3 digits (e.g., 123)
   - Name: Your Name
9. Click Pay
10. Payment Success! ✅
```

---

## 💰 Going Live (After Testing)

### Complete KYC
```
1. Login to Razorpay Dashboard
2. Go to: Settings → Account & Settings
3. Click "Activate Account"
4. Submit:
   - PAN Card
   - Aadhaar Card
   - Bank Account Details
   - Business Proof (if applicable)
5. Wait for approval (1-2 days)
```

### Add Bank Account
```
1. Go to: Settings → Bank Accounts
2. Click "Add Bank Account"
3. Enter:
   - Account Number
   - IFSC Code
   - Account Holder Name
4. Verify with penny drop
```

### Switch to Live Keys
```
1. Go to: https://dashboard.razorpay.com/app/keys
2. Click "Generate Live Keys"
3. Copy Live Keys
4. Update .env.local:
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXX
   RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYY
5. Restart server
```

---

## 💳 Test Cards

### Success Cards:
```
Card: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
```

### Failure Card:
```
Card: 4111 1111 1111 1234
(Use to test payment failure)
```

### 3D Secure OTP:
```
When prompted for OTP, enter: 1234
```

---

## 💸 Payment Flow

### Customer Side:
```
1. Add items to cart
2. Go to checkout
3. Fill details
4. Select payment method:
   - Card Payment → Razorpay popup
   - COD → Direct order
5. Complete payment
6. Order confirmed
```

### Your Side:
```
1. Customer pays via Razorpay
2. Money goes to Razorpay account
3. Auto-settlement to bank (T+2 days)
4. Check payments in Dashboard
5. Download reports
```

---

## 📊 View Payments

### Razorpay Dashboard:
```
1. Login: https://dashboard.razorpay.com/
2. Go to "Payments"
3. See all transactions
4. Filter by date, status
5. Download reports
6. Issue refunds
```

---

## 💰 Settlement

### Auto Settlement:
```
- Payments settle to bank automatically
- Default: T+2 days (2 days after payment)
- Can change to T+1 or T+3
- Check in: Settings → Settlements
```

### Manual Settlement:
```
1. Go to: Settlements
2. Click "Settle Now"
3. Money transferred to bank
```

---

## 🔒 Security

### Razorpay Handles:
```
✅ PCI DSS Compliance
✅ Card data encryption
✅ 3D Secure authentication
✅ Fraud detection
✅ Chargeback protection
```

### You Don't Store:
```
❌ Card numbers
❌ CVV
❌ Card holder data
(All handled by Razorpay)
```

---

## 💵 Fees

### Transaction Fees:
```
- Domestic Cards: 2% + GST
- UPI: 2% + GST
- Netbanking: 2% + GST
- International Cards: 3% + GST

Example:
Customer pays: ₹1000
Razorpay fee: ₹20 + GST (₹3.60) = ₹23.60
You receive: ₹976.40
```

### No Hidden Charges:
```
✅ No setup fee
✅ No annual fee
✅ No maintenance fee
✅ Pay only per transaction
```

---

## 📞 Support

### Razorpay Support:
```
📧 Email: support@razorpay.com
📞 Phone: 1800-102-0480 (Toll-free)
💬 Chat: Available in dashboard
📚 Docs: https://razorpay.com/docs/
```

### Common Issues:
```
Q: Payment not working?
A: Check if keys are correct in .env.local

Q: Test mode not working?
A: Use test keys (rzp_test_...)

Q: Live payments failing?
A: Complete KYC first

Q: Money not received?
A: Check settlement schedule (T+2 days)
```

---

## ✅ Checklist

Before Going Live:
```
☐ Razorpay account created
☐ Test keys added
☐ Test payment successful
☐ KYC completed
☐ Bank account added
☐ Live keys generated
☐ Live keys added to .env.local
☐ Server restarted
☐ Live payment tested
☐ Ready to accept payments! 🎉
```

---

## 🎯 Quick Commands

```bash
# Install Razorpay
npm install razorpay

# Start server
npm run dev

# Check if Razorpay is loaded
# Open browser console and type:
window.Razorpay

# Should show: function Razorpay()
```

---

## 🚨 Important Notes

1. **Test Mode**: Use test keys for testing
2. **Live Mode**: Use live keys for real payments
3. **Never commit**: Don't commit .env.local to git
4. **KYC Required**: Must complete KYC for live payments
5. **Bank Account**: Add bank account for settlements

---

## 🎉 You're Ready!

Your payment gateway is now integrated!
Customers can pay directly to your account.
Money will be settled to your bank automatically.

Happy Selling! 🛍️
