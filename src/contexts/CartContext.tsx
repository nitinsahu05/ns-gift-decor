'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

interface CartItem {
  id: string
  userId: string
  productId: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    image?: string
    stock: number
  }
}

interface CartState {
  items: CartItem[]
  total: number
  count: number
  loading: boolean
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: { items: CartItem[]; total: number; count: number } }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  total: 0,
  count: 0,
  loading: true
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        count: action.payload.count,
        loading: false
      }
    
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        count: state.count + action.payload.quantity,
        total: state.total + (action.payload.product.price * action.payload.quantity)
      }
    
    case 'UPDATE_ITEM':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
      )
      const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        count: newCount
      }
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload)
      const removedItem = state.items.find(item => item.id === action.payload)
      const filteredTotal = filteredItems.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
      )
      const filteredCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: filteredItems,
        total: filteredTotal,
        count: filteredCount
      }
    
    case 'CLEAR_CART':
      return initialState
    
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addToCart: (productId: string, quantity?: number) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const fetchCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_CART', payload: data })
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
      })

      if (response.ok) {
        await fetchCart()
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      })

      if (response.ok) {
        await fetchCart()
      }
    } catch (error) {
      console.error('Error updating cart item:', error)
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchCart()
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  const clearCart = async () => {
    try {
      // Remove all items one by one
      await Promise.all(state.items.map(item => removeFromCart(item.id)))
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  const refreshCart = fetchCart

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}