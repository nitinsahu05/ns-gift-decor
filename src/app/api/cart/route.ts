import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// For demo purposes, we'll use a hardcoded user ID
// In a real app, you'd get this from authentication
const DEMO_USER_ID = 'demo-user-123'

export async function GET(request: NextRequest) {
  try {
    // Ensure demo user exists
    let demoUser = await db.user.findUnique({
      where: { id: DEMO_USER_ID }
    })

    if (!demoUser) {
      demoUser = await db.user.create({
        data: {
          id: DEMO_USER_ID,
          email: 'demo@example.com',
          name: 'Demo User'
        }
      })
    }

    const cartItems = await db.cartItem.findMany({
      where: { userId: DEMO_USER_ID },
      include: {
        product: true
      }
    })

    const cartTotal = cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    )

    return NextResponse.json({
      items: cartItems,
      total: cartTotal,
      count: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, quantity = 1 } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Check if product exists and has enough stock
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: 'Not enough stock available' },
        { status: 400 }
      )
    }

    // Ensure demo user exists
    let demoUser = await db.user.findUnique({
      where: { id: DEMO_USER_ID }
    })

    if (!demoUser) {
      demoUser = await db.user.create({
        data: {
          id: DEMO_USER_ID,
          email: 'demo@example.com',
          name: 'Demo User'
        }
      })
    }

    // Check if item already exists in cart
    const existingCartItem = await db.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: DEMO_USER_ID,
          productId
        }
      }
    })

    let cartItem

    if (existingCartItem) {
      // Update quantity if item exists
      const newQuantity = existingCartItem.quantity + quantity
      if (newQuantity > product.stock) {
        return NextResponse.json(
          { error: 'Not enough stock available' },
          { status: 400 }
        )
      }

      cartItem = await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: newQuantity },
        include: { product: true }
      })
    } else {
      // Create new cart item
      cartItem = await db.cartItem.create({
        data: {
          userId: DEMO_USER_ID,
          productId,
          quantity
        },
        include: { product: true }
      })
    }

    return NextResponse.json(cartItem, { status: 201 })
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    )
  }
}