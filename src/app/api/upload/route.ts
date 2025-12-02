import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('📤 Upload request received')
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      console.error('❌ No file provided')
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('📁 File received:', file.name, file.type, file.size)

    // Get Cloudinary credentials
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('❌ Missing Cloudinary credentials')
      return NextResponse.json(
        { error: 'Cloudinary not configured' },
        { status: 500 }
      )
    }

    console.log('✅ Cloudinary credentials found')

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64}`

    console.log('🔄 Uploading to Cloudinary...')

    // Upload to Cloudinary using REST API
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = await generateSignature(timestamp, apiSecret)

    const uploadFormData = new FormData()
    uploadFormData.append('file', dataURI)
    uploadFormData.append('timestamp', timestamp.toString())
    uploadFormData.append('api_key', apiKey)
    uploadFormData.append('signature', signature)
    uploadFormData.append('folder', 'ns-gift-decor')

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadFormData,
      }
    )

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error('❌ Cloudinary upload failed:', errorText)
      throw new Error(`Cloudinary upload failed: ${errorText}`)
    }

    const result = await uploadResponse.json()
    console.log('✅ Upload successful:', result.secure_url)

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    }, { status: 200 })
  } catch (error) {
    console.error('❌ Error uploading:', error)
    return NextResponse.json(
      {
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function generateSignature(timestamp: number, apiSecret: string): Promise<string> {
  const crypto = await import('crypto')
  const stringToSign = `folder=ns-gift-decor&timestamp=${timestamp}${apiSecret}`
  return crypto.createHash('sha1').update(stringToSign).digest('hex')
}
