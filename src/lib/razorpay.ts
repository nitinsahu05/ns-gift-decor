// Razorpay Payment Integration

export interface RazorpayOptions {
  amount: number // in rupees
  currency: string
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const initiateRazorpayPayment = async (
  options: RazorpayOptions,
  onSuccess: (response: any) => void,
  onFailure: (error: any) => void
) => {
  const res = await loadRazorpayScript()

  if (!res) {
    alert('Razorpay SDK failed to load. Please check your internet connection.')
    return
  }

  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

  if (!razorpayKey) {
    alert('Payment gateway not configured. Please contact support.')
    return
  }

  const paymentOptions = {
    key: razorpayKey,
    amount: options.amount * 100, // Convert to paise
    currency: options.currency,
    name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'N S GIFT & DECOR',
    description: `Order #${options.orderId}`,
    image: process.env.NEXT_PUBLIC_BUSINESS_LOGO || '/logo.svg',
    order_id: options.orderId,
    handler: function (response: any) {
      onSuccess(response)
    },
    prefill: {
      name: options.customerName,
      email: options.customerEmail,
      contact: options.customerPhone || ''
    },
    notes: {
      order_id: options.orderId
    },
    theme: {
      color: '#000000' // Your brand color
    },
    modal: {
      ondismiss: function () {
        onFailure({ error: 'Payment cancelled by user' })
      }
    }
  }

  // @ts-ignore
  const paymentObject = new window.Razorpay(paymentOptions)
  paymentObject.open()
}
