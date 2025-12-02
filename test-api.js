// Test Product Add API
async function testProductAdd() {
  try {
    console.log('🧪 Testing Product Add API...\n')
    
    const productData = {
      name: 'Test Keychain',
      description: 'Beautiful handmade keychain',
      price: 150,
      image: 'https://via.placeholder.com/300',
      category: 'Keychains',
      stock: 5
    }
    
    console.log('📤 Sending data:', productData)
    
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    })
    
    console.log('📥 Response status:', response.status)
    
    const data = await response.json()
    console.log('📦 Response data:', data)
    
    if (response.ok) {
      console.log('\n✅ SUCCESS! Product added successfully!')
      console.log('Product ID:', data.id)
    } else {
      console.log('\n❌ FAILED! Error:', data.error)
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testProductAdd()
