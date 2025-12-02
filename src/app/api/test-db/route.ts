import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    console.log('🔍 Testing database connection...')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('DATABASE_URL preview:', process.env.DATABASE_URL?.substring(0, 30) + '...')
    
    // Test connection
    await db.$connect()
    console.log('✅ Database connected')
    
    // Test query
    const result = await db.$queryRaw`SELECT 1 as test`
    console.log('✅ Query executed:', result)
    
    // Count products
    const productCount = await db.product.count()
    console.log('✅ Product count:', productCount)
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      productCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Database test failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
