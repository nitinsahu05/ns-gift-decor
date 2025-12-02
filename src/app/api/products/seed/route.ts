import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Sample products for N S GIFT & DECOR
    const sampleProducts = [
      {
        name: "Floral Charm Keychain",
        description: "Beautiful floral design keychain with intricate details, perfect for adding elegance to your keys or bag.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=400&fit=crop",
        category: "Keychains",
        stock: 15
      },
      {
        name: "Peacock Feather Earrings",
        description: "Stunning peacock feather inspired earrings with vibrant colors and graceful design.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1511556532299-8f78cead2630?w=400&h=400&fit=crop",
        category: "Earrings",
        stock: 12
      },
      {
        name: "Heart Locket Keychain",
        description: "Romantic heart-shaped locket keychain that can hold tiny photos or messages.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=400&fit=crop",
        category: "Keychains",
        stock: 20
      },
      {
        name: "Traditional Jhumka Earrings",
        description: "Classic Indian jhumka earrings with traditional design and modern appeal.",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1511556532299-8f78cead2630?w=400&h=400&fit=crop",
        category: "Earrings",
        stock: 8
      },
      {
        name: "Starlight Keychain",
        description: "Sparkling star-shaped keychain that catches the light beautifully, perfect for night outings.",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=400&fit=crop",
        category: "Keychains",
        stock: 25
      },
      {
       name: "Pearl Drop Earrings",
        description: "Elegant pearl drop earrings that add sophistication to any outfit.",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1511556532299-8f78cead2630?w=400&h=400&fit=crop",
        category: "Earrings",
        stock: 10
      },
      {
        name: "Butterfly Keychain",
        description: "Delicate butterfly design keychain symbolizing transformation and beauty.",
        price: 169.99,
        image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=400&fit=crop",
        category: "Keychains",
        stock: 18
      },
      {
        name: "Temple Jewelry Earrings",
        description: "Traditional temple design earrings inspired by South Indian jewelry heritage.",
        price: 449.99,
        image: "https://images.unsplash.com/photo-1511556532299-8f78cead2630?w=400&h=400&fit=crop",
        category: "Earrings",
        stock: 6
      }
    ]

    // Clear existing products first (optional)
    await db.product.deleteMany()

    // Add all sample products
    const createdProducts = await db.product.createMany({
      data: sampleProducts
    })

    return NextResponse.json({ 
      message: `Successfully added ${createdProducts.count} sample products`,
      count: createdProducts.count
    })
  } catch (error) {
    console.error('Error adding sample products:', error)
    return NextResponse.json(
      { error: 'Failed to add sample products' },
      { status: 500 }
    )
  }
}