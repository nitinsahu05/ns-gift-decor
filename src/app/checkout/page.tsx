'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Lock, Truck, Package, ArrowLeft, Banknote } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatINR } from '@/lib/currency'
import LoadingSpinner from '@/components/LoadingSpinner'

interface CheckoutForm {
  // Customer Information
  email: string
  firstName: string
  lastName: string
  phone: string
  
  // Shipping Address
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Payment Information
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card')
  const [form, setForm] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const subtotal = state.total
  const tax = subtotal * 0.18 // 18% GST for India
  const shipping = 0
  const total = subtotal + tax + shipping

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // If COD, create order directly
      if (paymentMethod === 'cod') {
        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerInfo: {
              email: form.email,
              firstName: form.firstName,
              lastName: form.lastName,
              phone: form.phone
            },
            shippingAddress: {
              address: form.address,
              city: form.city,
              state: form.state,
              zipCode: form.zipCode,
              country: form.country
            },
            paymentMethod: 'cod',
            paymentStatus: 'pending',
            items: state.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price
            })),
            total
          })
        })

        if (orderResponse.ok) {
          await clearCart()
          router.push('/checkout/success')
        } else {
          throw new Error('Failed to create order')
        }
      } 
      // If Card payment, initiate Razorpay
      else {
        // Import Razorpay dynamically
        const { initiateRazorpayPayment } = await import('@/lib/razorpay')
        
        // Generate order ID
        const orderId = `ORD${Date.now()}`
        
        // Initiate Razorpay payment
        await initiateRazorpayPayment(
          {
            amount: total,
            currency: 'INR',
            orderId: orderId,
            customerName: `${form.firstName} ${form.lastName}`,
            customerEmail: form.email
          },
          async (response: any) => {
            // Payment successful
            const orderResponse = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customerInfo: {
                  email: form.email,
                  firstName: form.firstName,
                  lastName: form.lastName
                },
                shippingAddress: {
                  address: form.address,
                  city: form.city,
                  state: form.state,
                  zipCode: form.zipCode,
                  country: form.country
                },
                paymentMethod: 'card',
                paymentStatus: 'paid',
                paymentId: response.razorpay_payment_id,
                items: state.items.map(item => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.product.price
                })),
                total
              })
            })

            if (orderResponse.ok) {
              await clearCart()
              router.push('/checkout/success')
            }
          },
          (error: any) => {
            // Payment failed
            console.error('Payment failed:', error)
            alert('Payment failed. Please try again.')
            setLoading(false)
          }
        )
      }
    } catch (error) {
      console.error('Error processing order:', error)
      alert('There was an error processing your order. Please try again.')
      setLoading(false)
    }
  }

  if (state.loading) {
    return <LoadingSpinner />
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart to checkout
            </p>
            <Link href="/">
              <Button>Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Navigation Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="N S GIFT & DECOR"
                  fill
                  className="object-contain group-hover:rotate-6 transition-transform"
                  priority
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                N S GIFT & DECOR
              </span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </Link>
              <Link href="/orders" className="text-muted-foreground hover:text-foreground transition-colors">
                Track Order
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>
        </div>
        
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                1
              </div>
              <span className="text-sm font-medium mt-2">Cart</span>
            </div>
            <div className="flex-1 h-1 bg-primary"></div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg animate-pulse">
                2
              </div>
              <span className="text-sm font-medium mt-2">Checkout</span>
            </div>
            <div className="flex-1 h-1 bg-muted"></div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-lg">
                3
              </div>
              <span className="text-sm font-medium mt-2 text-muted-foreground">Complete</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 animate-slide-in-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <Card className="shadow-xl border-2 hover:shadow-2xl transition-shadow overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>
                <CardHeader className="relative bg-gradient-to-r from-primary/5 to-transparent border-b">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={form.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll use this to contact you about your order
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="shadow-xl border-2 hover:shadow-2xl transition-shadow overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>
                <CardHeader className="relative bg-gradient-to-r from-primary/5 to-transparent border-b">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Truck className="w-5 h-5 text-primary" />
                    </div>
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={form.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={form.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={form.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={form.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <Card className="shadow-xl border-2 hover:shadow-2xl transition-shadow overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>
                <CardHeader className="relative bg-gradient-to-r from-primary/5 to-transparent border-b">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <RadioGroup value={paymentMethod} onValueChange={(value: 'card' | 'cod') => setPaymentMethod(value)}>
                    <div className="space-y-3">
                      {/* Credit/Debit Card Option */}
                      <div 
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === 'card' 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : 'border-muted hover:border-primary/50 hover:bg-muted/50'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">Credit / Debit Card</div>
                            <div className="text-sm text-muted-foreground">Pay securely with your card</div>
                          </div>
                          <div className="flex gap-1">
                            <div className="w-8 h-6 bg-gradient-to-br from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">V</div>
                            <div className="w-8 h-6 bg-gradient-to-br from-red-600 to-orange-400 rounded flex items-center justify-center text-white text-xs font-bold">M</div>
                          </div>
                        </Label>
                      </div>

                      {/* Cash on Delivery Option */}
                      <div 
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === 'cod' 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : 'border-muted hover:border-primary/50 hover:bg-muted/50'
                        }`}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Banknote className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">Cash on Delivery</div>
                            <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            Available
                          </Badge>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Card Details - Only show when card is selected */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 animate-fade-in pt-4 border-t">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={form.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          required={paymentMethod === 'card'}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          value={form.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          required={paymentMethod === 'card'}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={form.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            required={paymentMethod === 'card'}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={form.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            required={paymentMethod === 'card'}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-900">
                        <Lock className="w-4 h-4 text-green-600" />
                        Your payment information is encrypted and secure
                      </div>
                    </div>
                  )}

                  {/* COD Info - Only show when COD is selected */}
                  {paymentMethod === 'cod' && (
                    <div className="animate-fade-in pt-4 border-t">
                      <div className="bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-900">
                        <div className="flex items-start gap-3">
                          <Banknote className="w-5 h-5 text-green-600 mt-0.5" />
                          <div className="space-y-2">
                            <h4 className="font-semibold text-green-900 dark:text-green-100">Cash on Delivery</h4>
                            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                              <li>✓ Pay in cash when your order is delivered</li>
                              <li>✓ No advance payment required</li>
                              <li>✓ Inspect your order before payment</li>
                              <li>✓ Keep exact change ready for smooth delivery</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]" 
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : paymentMethod === 'cod' ? (
                  <>
                    <Banknote className="w-5 h-5 mr-2" />
                    Place Order - {formatINR(total)} (Pay on Delivery)
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Complete Payment - {formatINR(total)}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-slide-in-right">
            <Card className="sticky top-24 shadow-xl border-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>
              <CardHeader className="relative bg-gradient-to-br from-primary/5 to-transparent border-b">
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {state.items.map((item, index) => (
                      <div 
                        key={item.id} 
                        className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-muted/30 to-transparent hover:from-muted/50 transition-all animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                          {item.product.image ? (
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-400">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{item.product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </div>
                        </div>
                        <div className="font-bold text-primary">
                          {formatINR(item.product.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">{formatINR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span className="font-semibold">{formatINR(tax)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-3xl font-bold text-primary">
                        {formatINR(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}