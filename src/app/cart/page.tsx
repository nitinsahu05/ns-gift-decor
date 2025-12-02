'use client'

import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatINR } from '@/lib/currency'
import { useToast } from '@/hooks/use-toast'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart()
  const { toast } = useToast()

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      if (newQuantity < 1) {
        await removeFromCart(itemId)
      } else {
        await updateQuantity(itemId, newQuantity)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleRemoveItem = async (itemId: string, productName: string) => {
    try {
      await removeFromCart(itemId)
      toast({
        title: "Item Removed",
        description: `${productName} has been removed from your cart.`,
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleClearCart = async () => {
    try {
      await clearCart()
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  if (state.loading) {
    return <LoadingSpinner />
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
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 animate-slide-in-left">
            <Card className="shadow-xl border-2 hover:shadow-2xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                  </div>
                  Shopping Cart
                  <Badge variant="secondary" className="ml-auto text-base px-4 py-1">
                    {state.count} {state.count === 1 ? 'item' : 'items'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {state.items.length === 0 ? (
                  <div className="text-center py-16 animate-scale-in">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-8 text-lg">
                      Add some beautiful items to your cart to get started
                    </p>
                    <Link href="/">
                      <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {state.items.map((item, index) => (
                      <div 
                        key={item.id} 
                        className="flex items-center gap-6 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-transparent hover:from-muted/50 transition-all border border-transparent hover:border-primary/20 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md group">
                          {item.product.image ? (
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-400">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-lg mb-1">{item.product.name}</h4>
                          <Badge variant="secondary" className="text-xs mb-2">
                            {item.product.stock} in stock
                          </Badge>
                          <div className="text-2xl font-bold text-primary">
                            {formatINR(item.product.price)}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-10 w-10 p-0 hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="w-16 h-10 flex items-center justify-center font-bold text-lg bg-muted rounded-md">
                            {item.quantity}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="h-10 w-10 p-0 hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <div className="text-sm text-muted-foreground mb-1">Total</div>
                          <div className="text-xl font-bold">
                            {formatINR(item.product.price * item.quantity)}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveItem(item.id, item.product.name)}
                          className="h-10 w-10 p-0 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}

                    <div className="flex justify-between items-center pt-6 border-t-2">
                      <Button
                        variant="outline"
                        onClick={handleClearCart}
                        disabled={state.items.length === 0}
                        className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Cart
                      </Button>
                      <Link href="/">
                        <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-slide-in-right">
            <Card className="sticky top-24 shadow-xl border-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>
              <CardHeader className="relative bg-gradient-to-br from-primary/5 to-transparent border-b">
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatINR(state.total)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="font-semibold">{formatINR(state.total * 0.18)}</span>
                  </div>
                  <div className="border-t-2 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-3xl font-bold text-primary">
                        {formatINR(state.total * 1.18)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Link href="/checkout">
                  <Button 
                    className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]" 
                    size="lg"
                    disabled={state.items.length === 0}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure checkout • SSL encrypted
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Cash on Delivery Available
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