"use client"

import { useEffect } from "react"
import { useShoppingCart } from "use-shopping-cart"

interface SucecssProps {
  params: {
    SesionId: string
  }
}

export default function Success({ params }: SucecssProps) {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="container text-3xl my-10 space-x-4 flex flex-col items-center">
      <h1>Sua compra foi aprovada, obrigado!</h1>
      <p className="text-lg font-normal"> dados da sua coompra: {params.SesionId}</p>
    </div>
  )
}