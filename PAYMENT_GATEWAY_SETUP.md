# Payment Gateway Integration Guide

## Razorpay Setup (Recommended for India)

### Step 1: Create Razorpay Account
1. Go to: https://razorpay.com/
2. Click "Sign Up"
3. Enter your business details
4. Complete KYC verification
5. Add bank account details

### Step 2: Get API Keys
1. Login to Razorpay Dashboard
2. Go to Settings → API Keys
3. Generate Test Keys (for testing)
4. Generate Live Keys (for production)
5. Copy both Key ID and Key Secret

### Step 3: Add Keys to Your Project
Create `.env.local` file in your project root:

```env
# Razorpay Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET

# For Production (after going live)
# NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
# RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```

### Step 4: Install Razorpay Package
```bash
npm install razorpay
```

### Step 5: Test Payment Flow
1. Use test card: 4111 1111 1111 1111
2. Any future expiry date
3. Any CVV

### Step 6: Go Live
1. Complete KYC in Razorpay Dashboard
2. Add bank account
3. Switch to Live Keys
4. Update .env.local with live keys

---

## Alternative: PhonePe Payment Gateway

### Setup PhonePe
1. Go to: https://www.phonepe.com/business-solutions/payment-gateway/
2. Sign up for merchant account
3. Complete KYC
4. Get API credentials

### PhonePe Integration
```env
PHONEPE_MERCHANT_ID=YOUR_MERCHANT_ID
PHONEPE_SALT_KEY=YOUR_SALT_KEY
PHONEPE_SALT_INDEX=YOUR_SALT_INDEX
```

---

## Alternative: Paytm Payment Gateway

### Setup Paytm
1. Go to: https://business.paytm.com/payment-gateway
2. Create merchant account
3. Complete KYC
4. Get credentials

### Paytm Integration
```env
PAYTM_MERCHANT_ID=YOUR_MERCHANT_ID
PAYTM_MERCHANT_KEY=YOUR_MERCHANT_KEY
```

---

## Alternative: Instamojo (Good for Small Businesses)

### Setup Instamojo
1. Go to: https://www.instamojo.com/
2. Sign up
3. Complete profile
4. Get API credentials

### Instamojo Integration
```env
INSTAMOJO_API_KEY=YOUR_API_KEY
INSTAMOJO_AUTH_TOKEN=YOUR_AUTH_TOKEN
```

---

## Payment Flow

### For Card Payments:
1. Customer adds items to cart
2. Goes to checkout
3. Selects "Card Payment"
4. Razorpay popup opens
5. Customer enters card details
6. Payment processed
7. Money goes to your Razorpay account
8. You can transfer to bank account

### For COD (Cash on Delivery):
1. Customer selects COD
2. Order is placed
3. Payment collected on delivery
4. You receive cash directly

---

## Bank Account Setup

### For Receiving Payments:
1. Add your bank account in Razorpay Dashboard
2. Complete bank verification
3. Set auto-settlement (daily/weekly)
4. Payments will be transferred automatically

### Settlement Time:
- **Razorpay**: T+2 days (2 days after transaction)
- **PhonePe**: T+1 to T+2 days
- **Paytm**: T+1 to T+3 days

---

## Fees Structure

### Razorpay:
- Domestic Cards: 2% + GST
- UPI: 2% + GST
- Netbanking: 2% + GST
- No setup fee
- No annual fee

### PhonePe:
- 1.99% + GST per transaction
- No setup fee

### Paytm:
- 1.99% to 2.5% + GST
- Depends on volume

### Instamojo:
- 2% + ₹3 per transaction + GST
- Good for small businesses

---

## Security Features

### Razorpay Provides:
- ✅ PCI DSS Compliant
- ✅ 3D Secure Authentication
- ✅ Fraud Detection
- ✅ Automatic Refunds
- ✅ Webhook Notifications
- ✅ Payment Links
- ✅ QR Code Payments

---

## Testing

### Test Cards (Razorpay):
- **Success**: 4111 1111 1111 1111
- **Failure**: 4111 1111 1111 1234
- **OTP**: 1234 (for 3D Secure)

### Test UPI:
- success@razorpay
- failure@razorpay

---

## Next Steps

1. ✅ Choose payment gateway (Razorpay recommended)
2. ✅ Create account
3. ✅ Get API keys
4. ✅ Add keys to .env.local
5. ✅ Install package: `npm install razorpay`
6. ✅ Test with test keys
7. ✅ Complete KYC
8. ✅ Switch to live keys
9. ✅ Start accepting payments!

---

## Support

### Razorpay Support:
- Email: support@razorpay.com
- Phone: 1800-102-0480
- Docs: https://razorpay.com/docs/

### PhonePe Support:
- Email: merchantsupport@phonepe.com
- Docs: https://developer.phonepe.com/

### Need Help?
Contact me for integration support!
