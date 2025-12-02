'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Package, Truck, CheckCircle, Clock, XCircle, AlertCircle, ArrowLeft, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'
import { formatINR } from '@/lib/currency'
import LoadingSpinner from '@/components/LoadingSpinner'
import Image from 'next/image'

interface Order {
  id: string
  status: string
  total: number
  createdAt: string
  items: {
    id: string
    quantity: number
    price: number
    product: {
      id: string
      name: string
      image?: string
    }
  }[]
}

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Order received and being processed'
  },
  confirmed: {
    label: 'Confirmed',
    icon: Package,
    color: 'bg-blue-100 text-blue-800',
    description: 'Order confirmed and preparing for shipment'
  },
  shipped: {
    label: 'Shipped',
    icon: Truck,
    color: 'bg-purple-100 text-purple-800',
    description: 'Order has been shipped and is on the way'
  },
  delivered: {
    label: 'Delivered',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800',
    description: 'Order has been delivered successfully'
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    color: 'bg-red-100 text-red-800',
    description: 'Order has been cancelled'
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredOrders(filtered)
    } else {
      setFilteredOrders(orders)
    }
  }, [orders, searchTerm])

  const fetchOrders = async () => {
    try {
      // For demo purposes, we'll fetch all orders
      // In a real app, you'd fetch orders for the logged-in user
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
        setFilteredOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  if (loading) {
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
              <Link href="/orders" className="text-primary font-semibold">
                Track Order
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group mb-6">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Track Your Orders
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                Check the status and details of your recent orders
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <Card className="max-w-2xl shadow-lg border-2">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search by Order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="shadow-xl border-2 animate-scale-in">
            <CardContent className="p-16 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                <Package className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No Orders Found</h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                {searchTerm ? 'No orders match your search. Try a different Order ID.' : "You haven't placed any orders yet. Start shopping to see your orders here!"}
              </p>
              <Link href="/">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <Package className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status)
              const StatusIcon = statusInfo.icon

              return (
                <Card 
                  key={order.id} 
                  className="shadow-xl border-2 hover:shadow-2xl transition-all overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>
                  
                  <CardHeader className="bg-gradient-to-r from-muted/30 to-transparent border-b pb-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="space-y-2">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Package className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-bold">Order #{order.id.slice(0, 8).toUpperCase()}</div>
                            <div className="text-sm font-normal text-muted-foreground flex items-center gap-2 mt-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </CardTitle>
                      </div>
                      <Badge className={`${statusInfo.color} px-4 py-2 text-sm font-semibold`}>
                        <StatusIcon className="w-4 h-4 mr-2" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Status Timeline */}
                      <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-5 rounded-xl border-2 border-muted">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${statusInfo.color.replace('text-', 'bg-').replace('100', '200')}`}>
                            <StatusIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1">{statusInfo.description}</h4>
                            <p className="text-sm text-muted-foreground">
                              Current status: <span className="font-semibold">{statusInfo.label}</span>
                            </p>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="flex justify-between mb-2">
                            {Object.entries(statusConfig).filter(([key]) => key !== 'cancelled').map(([key, config]) => {
                              const Icon = config.icon
                              const isActive = key === order.status
                              const isPast = ['pending', 'confirmed', 'shipped', 'delivered'].indexOf(key) <= 
                                             ['pending', 'confirmed', 'shipped', 'delivered'].indexOf(order.status)
                              
                              return (
                                <div key={key} className="flex flex-col items-center flex-1">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                    isPast ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-muted text-muted-foreground'
                                  } ${isActive ? 'ring-4 ring-primary/30 scale-110' : ''}`}>
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <span className={`text-xs mt-2 font-medium ${isPast ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {config.label}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                              style={{ 
                                width: `${(['pending', 'confirmed', 'shipped', 'delivered'].indexOf(order.status) + 1) * 25}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Package className="w-5 h-5 text-primary" />
                          Order Items ({order.items.length})
                        </h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-xl border border-muted hover:border-primary/30 transition-all">
                              <div className="flex items-center gap-4 flex-1">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                  {item.product.image ? (
                                    <Image
                                      src={item.product.image}
                                      alt={item.product.name}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <Package className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-base">{item.product.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Quantity: <span className="font-semibold">{item.quantity}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="font-bold text-lg text-primary">
                                {formatINR(item.price * item.quantity)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="border-t-2 pt-6">
                        <div className="flex justify-between items-center bg-gradient-to-r from-primary/10 to-transparent p-5 rounded-xl">
                          <span className="text-xl font-bold">Total Amount:</span>
                          <span className="text-3xl font-bold text-primary">
                            {formatINR(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}