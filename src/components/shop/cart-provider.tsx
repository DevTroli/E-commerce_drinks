"use client"
import { CartProvider } from "use-shopping-cart"

interface CartProviderProps {
  children: React.ReactNode
}

const StripeKey = process.env.STRIPE_SECRET_KEY!

export function AppCartProvider({ children }: CartProviderProps) {
  return (
    <CartProvider
      shouldPersist={true}
      stripe={StripeKey}
      currency='BRL'
      cartMode= 'checkout-session'
    >
      {children}
    </CartProvider>
  )
}