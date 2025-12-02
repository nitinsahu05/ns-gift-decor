'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Edit, Trash2, Image as ImageIcon, Settings, Package, ShoppingCart, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { useRouter } from 'next/navigation'
import { formatINR } from '@/lib/currency'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category: string
  stock: number
}

interface Order {
  id: string
  userId: string
  status: string
  total: number
  createdAt: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  shippingAddress?: string
  shippingCity?: string
  shippingState?: string
  shippingZip?: string
  shippingCountry?: string
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
  user: {
    id: string
    email: string
    name?: string
  }
}

export default function AdminPage() {
  const { isAuthenticated, logout } = useAdminAuth()
  const router = useRouter()
  
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<string[]>(['Keychains', 'Earrings', 'Other'])
  const [newCategory, setNewCategory] = useState('')
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: ''
  })

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    fetchProducts()
    fetchOrders()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          image: formData.image,
          category: formData.category,
          stock: parseInt(formData.stock)
        }),
      })

      if (response.ok) {
        await fetchProducts()
        setIsDialogOpen(false)
        resetForm()
        alert('✅ Product saved successfully!')
      } else {
        const errorData = await response.json()
        console.error('❌ Error response:', errorData)
        alert(`Failed to save product: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product. Check console for details.')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      image: product.image || '',
      category: product.category,
      stock: product.stock.toString()
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          await fetchProducts()
        }
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      stock: ''
    })
    setEditingProduct(null)
  }

  const handleOrderStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (response.ok) {
        await fetchOrders()
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  // Load categories from localStorage
  useEffect(() => {
    const savedCategories = localStorage.getItem('categories')
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }
  }, [])

  // Save categories to localStorage
  const saveCategories = (newCategories: string[]) => {
    setCategories(newCategories)
    localStorage.setItem('categories', JSON.stringify(newCategories))
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()]
      saveCategories(updatedCategories)
      setNewCategory('')
      setIsCategoryDialogOpen(false)
    }
  }

  const handleDeleteCategory = (categoryToDelete: string) => {
    if (confirm(`Are you sure you want to delete "${categoryToDelete}" category?`)) {
      const updatedCategories = categories.filter(cat => cat !== categoryToDelete)
      saveCategories(updatedCategories)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50 shadow-lg">
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
              <Link href="/admin" className="flex items-center gap-2 text-primary font-semibold">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <Settings className="w-4 h-4" />
                </div>
                Admin
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="p-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Total Products</p>
                    <p className="text-4xl font-bold text-primary mt-2">{products.length}</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-2xl">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Total Orders</p>
                    <p className="text-4xl font-bold text-primary mt-2">{orders.length}</p>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-2xl">
                    <ShoppingCart className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Total Revenue</p>
                    <p className="text-4xl font-bold text-primary mt-2">
                      {formatINR(orders.reduce((sum, order) => sum + order.total, 0))}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-2xl">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-lg mt-2">Manage your products and orders</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} size="lg" className="shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="image">Product Image URL</Label>
                    
                    <Input
                      id="imageUrl"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-xs text-blue-800 dark:text-blue-200 font-medium mb-2">
                        📸 How to get image URL:
                      </p>
                      <ol className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                        <li>Go to <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" className="underline font-medium">ImgBB.com</a></li>
                        <li>Upload your image</li>
                        <li>Copy "Direct link"</li>
                        <li>Paste here</li>
                      </ol>
                    </div>
                    
                    {/* Image Preview */}
                    {formData.image && (
                      <div className="mt-3">
                        <Label className="text-sm text-muted-foreground">Preview</Label>
                        <div className="mt-2 relative w-32 h-32 border-2 border-dashed rounded-lg overflow-hidden">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid URL%3C/text%3E%3C/svg%3E'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsDialogOpen(false)
                        resetForm()
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 h-12">
              <TabsTrigger value="products" className="flex items-center gap-2 text-base">
                <Package className="w-5 h-5" />
                Products
                <Badge variant="secondary" className="ml-1">{products.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2 text-base">
                <ShoppingCart className="w-5 h-5" />
                Orders
                <Badge variant="secondary" className="ml-1">{orders.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2 text-base">
                <Settings className="w-5 h-5" />
                Categories
                <Badge variant="secondary" className="ml-1">{categories.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="animate-fade-in">
              <Card className="shadow-xl border-2">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Package className="w-6 h-6 text-primary" />
                    Products Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product, index) => (
                        <TableRow 
                          key={product.id} 
                          className="hover:bg-muted/50 transition-colors animate-fade-in-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <TableCell>
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md group">
                              {product.image ? (
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                  <ImageIcon className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-bold text-base">{product.name}</div>
                              <div className="text-sm text-muted-foreground line-clamp-1">
                                {product.description || 'No description'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-medium">{product.category}</Badge>
                          </TableCell>
                          <TableCell className="font-bold text-primary text-base">
                            {formatINR(product.price)}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={product.stock > 5 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
                              className="font-semibold"
                            >
                              {product.stock} {product.stock === 1 ? 'unit' : 'units'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(product)}
                                className="hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(product.id)}
                                className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {products.length === 0 && (
                    <div className="text-center py-16 animate-scale-in">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">No products yet</h3>
                      <p className="text-muted-foreground text-lg mb-6">
                        Add your first product to get started!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="animate-fade-in">
              <Card className="shadow-xl border-2">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                    Orders Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, index) => (
                        <TableRow 
                          key={order.id}
                          className="hover:bg-muted/50 transition-colors animate-fade-in-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <TableCell className="font-mono text-sm font-semibold">
                            #{order.id.slice(0, 8)}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-bold text-base">
                                {order.customerName || order.user.name || 'N/A'}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                📧 {order.customerEmail || order.user.email}
                              </div>
                              {order.customerPhone && (
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  📞 {order.customerPhone}
                                </div>
                              )}
                              {order.shippingAddress && (
                                <div className="text-xs text-muted-foreground mt-1 p-2 bg-muted/30 rounded">
                                  📍 {order.shippingAddress}, {order.shippingCity}, {order.shippingState} {order.shippingZip}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {order.items.map((item) => (
                                <div key={item.id} className="text-sm bg-muted/50 px-2 py-1 rounded">
                                  <span className="font-semibold">{item.quantity}x</span> {item.product.name}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-primary text-base">
                            {formatINR(order.total)}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(value) => handleOrderStatusUpdate(order.id, value)}
                            >
                              <SelectTrigger className="w-36 font-medium">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">🕐 Pending</SelectItem>
                                <SelectItem value="confirmed">✅ Confirmed</SelectItem>
                                <SelectItem value="shipped">🚚 Shipped</SelectItem>
                                <SelectItem value="delivered">📦 Delivered</SelectItem>
                                <SelectItem value="cancelled">❌ Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="font-medium">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {orders.length === 0 && (
                    <div className="text-center py-16 animate-scale-in">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">No orders yet</h3>
                      <p className="text-muted-foreground text-lg">
                        Orders will appear here once customers make purchases
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="animate-fade-in">
              <Card className="shadow-xl border-2">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Settings className="w-6 h-6 text-primary" />
                      Category Management
                    </CardTitle>
                    <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="lg" className="shadow-lg hover:shadow-xl transition-all hover:scale-105">
                          <Plus className="w-5 h-5 mr-2" />
                          Add Category
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">
                            ➕ Add New Category
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <Label htmlFor="newCategory">Category Name</Label>
                            <Input
                              id="newCategory"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              placeholder="e.g., Decorations, Gifts, etc."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddCategory()
                                }
                              }}
                            />
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button onClick={handleAddCategory} className="flex-1">
                              Add Category
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => {
                                setIsCategoryDialogOpen(false)
                                setNewCategory('')
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {categories.length === 0 ? (
                    <div className="text-center py-16 animate-scale-in">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                        <Settings className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">No Categories</h3>
                      <p className="text-muted-foreground text-lg mb-6">
                        Add your first category to organize products
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categories.map((category, index) => (
                        <Card 
                          key={category} 
                          className="hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                  <Package className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-lg">{category}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {products.filter(p => p.category === category).length} products
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteCategory(category)}
                                className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}