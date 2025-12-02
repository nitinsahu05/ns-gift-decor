import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let whereClause = {}

    if (category && category !== 'all') {
      whereClause = { ...whereClause, category }
    }

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { name: { contains: search } },
          { description: { contains: search } }
        ]
      }
    }

    const products = await db.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📦 Received product data:', body)
    
    const { name, description, price, image, category, stock } = body

    if (!name || !price || !category) {
      console.error('❌ Missing required fields:', { name, price, category })
      return NextResponse.json(
        { error: 'Missing required fields', details: { name: !!name, price: !!price, category: !!category } },
        { status: 400 }
      )
    }

    console.log('✅ Creating product with data:', {
      name,
      description,
      price: parseFloat(price),
      image,
      category,
      stock: parseInt(stock) || 0
    })

    const product = await db.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        stock: parseInt(stock) || 0
      }
    })

    console.log('✅ Product created successfully:', product.id)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('❌ Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}