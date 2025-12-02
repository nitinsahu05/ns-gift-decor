import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET
    
    return NextResponse.json({
      success: true,
      config: {
        cloudName: cloudName ? '✅ Set' : '❌ Missing',
        apiKey: apiKey ? '✅ Set' : '❌ Missing',
        apiSecret: apiSecret ? '✅ Set' : '❌ Missing',
        cloudNameValue: cloudName?.substring(0, 5) + '...',
        apiKeyValue: apiKey?.substring(0, 5) + '...',
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
