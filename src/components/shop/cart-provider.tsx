"use client"
import { CartProvider } from "use-shopping-cart"

interface CartProviderProps {
  children: React.ReactNode
}

const StripeKey = process.env.STRIPE_SECRET_KEY!

export function AppCartProvider({ children }: CartProviderProps) {
  return (
    <CartProvider
    cartMode= 'checkout-session'
    stripe={StripeKey}
    shouldPersist={true}
    currency='BRL'
    >
      {children}
    </CartProvider>
  )
}