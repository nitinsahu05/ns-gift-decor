'use client'

import { useCart } from '@/contexts/CartContext'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CartIcon() {
  const { state } = useCart()

  return (
    <Link href="/cart">
      <Button variant="ghost" size="sm" className="relative">
        <ShoppingCart className="w-5 h-5" />
        {state.count > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {state.count > 99 ? '99+' : state.count}
          </span>
        )}
      </Button>
    </Link>
  )
}