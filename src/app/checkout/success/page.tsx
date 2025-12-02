'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Package, Home, Truck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear any cart data that might remain
    const clearCart = async () => {
      try {
        await fetch('/api/cart', { method: 'DELETE' })
      } catch (error) {
        console.error('Error clearing cart:', error)
      }
    }
    clearCart()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-blue-50 dark:from-green-950/20 dark:via-background dark:to-blue-950/20 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <Card className="w-full max-w-2xl shadow-2xl border-2 animate-scale-in relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full"></div>
        
        <CardHeader className="text-center pb-8 pt-12 relative">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
              {/* Main circle */}
              <div className="relative p-6 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-950/20 rounded-full shadow-xl">
                <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-500 animate-scale-in" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          <CardTitle className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Order Placed Successfully! 🎉
          </CardTitle>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            Thank you for your purchase! We're excited to prepare your order. You'll receive a confirmation email shortly.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6 pb-12 px-8">
          {/* Order Status Timeline */}
          <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-6 rounded-xl border-2 border-muted">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-xl">What's Next?</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-lg">
                  ✓
                </div>
                <div>
                  <p className="font-semibold">Order Confirmed</p>
                  <p className="text-sm text-muted-foreground">Your order has been received and is being processed</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 shadow-lg animate-pulse">
                  2
                </div>
                <div>
                  <p className="font-semibold">Preparing Your Order</p>
                  <p className="text-sm text-muted-foreground">We're carefully packaging your items</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">Shipping Confirmation</p>
                  <p className="text-sm text-muted-foreground">You'll receive tracking details via email</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-blue-900 dark:text-blue-100">Email Confirmation</span>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">Check your inbox for order details</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10 p-4 rounded-lg border border-purple-200 dark:border-purple-900">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-900 dark:text-purple-100">Free Shipping</span>
              </div>
              <p className="text-sm text-purple-800 dark:text-purple-200">Delivered right to your doorstep</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button asChild className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-14 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all hover:scale-[1.02]"
              onClick={() => router.push('/orders')}
            >
              <Truck className="w-5 h-5 mr-2" />
              Track Your Order
            </Button>
          </div>

          {/* Support Message */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Need help? Contact us at{' '}
              <a href="mailto:support@nsgiftdecor.com" className="text-primary hover:underline font-medium">
                support@nsgiftdecor.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}