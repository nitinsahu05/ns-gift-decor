import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const DEMO_USER_ID = 'demo-user-123'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerInfo, shippingAddress, items, total } = body

    if (!customerInfo || !shippingAddress || !items || !total) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user exists, create if not
    let user = await db.user.findUnique({
      where: { id: DEMO_USER_ID }
    })

    if (!user) {
      user = await db.user.create({
        data: {
          id: DEMO_USER_ID,
          email: customerInfo.email,
          name: `${customerInfo.firstName} ${customerInfo.lastName}`
        }
      })
    }

    // Create order with customer details
    const order = await db.order.create({
      data: {
        userId: DEMO_USER_ID,
        status: 'pending',
        total,
        // Customer Information
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        // Shipping Address
        shippingAddress: shippingAddress.address,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state,
        shippingZip: shippingAddress.zipCode,
        shippingCountry: shippingAddress.country || 'India'
      }
    })

    // Create order items and update product stock
    for (const item of items) {
      await db.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }
      })

      // Update product stock
      await db.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      })
    }

    // Clear user's cart
    await db.cartItem.deleteMany({
      where: { userId: DEMO_USER_ID }
    })

    // Return the created order with items
    const createdOrder = await db.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(createdOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const orders = await db.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}