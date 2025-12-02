const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected')
    
    // Check existing products
    const existingProducts = await prisma.product.findMany()
    console.log(`📦 Existing products: ${existingProducts.length}`)
    
    // Try to create a test product
    console.log('➕ Creating test product...')
    const testProduct = await prisma.product.create({
      data: {
        name: 'Test Product',
        description: 'This is a test product',
        price: 99.99,
        image: 'https://via.placeholder.com/150',
        category: 'Keychains',
        stock: 10
      }
    })
    
    console.log('✅ Test product created:', testProduct)
    
    // Fetch all products again
    const allProducts = await prisma.product.findMany()
    console.log(`📦 Total products now: ${allProducts.length}`)
    console.log('Products:', allProducts)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()
