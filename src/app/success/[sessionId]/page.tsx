"use client"

import Link from "next/link"
import { useEffect } from "react"

import { CheckCircle } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"

export default function Success() {
  const { clearCart } = useShoppingCart()
  useEffect(() => {clearCart()}, [clearCart])

  return (
    <div className="container text-3xl my-10 space-x-4 flex flex-col items-center">
      <CheckCircle className="w-20 h-20 text-emerald-500" />
      <h1 className="text-3xl font-bold text-center text-emerald-900 m-2">Sua compra foi aprovada!</h1>
      <p className="text-lg font-normal w-1/3 text-center mt-2 text-emerald-950">
        Obrigado, por comprar na Drinkify e acreditar em nós,
        logo logo seu pedido irá chegar em sua casa!
      </p>
      <button className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white/90 ">
        <Link href="/">Voltar para a página inicial </Link>
      </button>
    </div>
  )
}