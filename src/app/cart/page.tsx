'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartEmpty } from "@/components/shop/cartEmpty";
import { useRouter } from "next/navigation";


export default function Cart() {
  const Router = useRouter();
  const { cartCount, cartDetails, addItem, decrementItem, clearCart } = useShoppingCart();
  const [isCheckOut, setIsCheckoutOut] = useState(false);

  

  async function RedirectToCheckout() {
    setIsCheckoutOut(true);
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartDetails)
    })

    const data = await response.json();
    
    Router.push(data.url)

    setIsCheckoutOut(false);
  }

  return (
    <section className="container flex flex-col my-2 space-y-2">
      <h1 className="text-3xl font-bold text-center text-emerald-950 m-4">Suas compras na Drinkify</h1>
      {cartDetails &&
        Object.keys(cartDetails).map((key) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="tracking-wider">
                {cartDetails[key].name}
              </CardTitle>
              <CardDescription className="text-md tracking-wide">
                {cartDetails[key].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center md:justify-between lg:justify-between justify-center md:space-x-4 lg:space-x-4 space-x-0 flex-col md:flex-row lg:flex-row">
                <div className="flex  flex-col md:flex-row lg:flex-row items-center space-x-4">
                  <div className="relative w-28 h-28">
                    <Image
                      src={cartDetails[key].image || cartDetails[key].images[0]}
                      fill
                      alt={cartDetails[key].name}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col mt-4 md:mt-0 lg:mt-0">
                    <p className="text-md font-medium leading-none">Valor</p>
                    <span className="text-lg text-muted-foreground">
                      {cartDetails[key].formattedValue}
                    </span>
                  </div>
                </div>
                  <div className="flex items-center justify-center space-x-3 mt-4 md:mt-0 lg:mt-0">
                  <button onClick={() => decrementItem(key)}>
                    <Minus className="text-red-400 hover:text-red-500" />
                  </button>
                  <span>{cartDetails[key].quantity}</span>
                  <button onClick={() => addItem(cartDetails[key])}>
                    <Plus className="text-green-500 hover:text-green-600" />
                  </button>
                  </div>
                </div>
            </CardContent>
          </Card>
        ))}
      <div className="flex items-center justify-center lg:justify-end space-x-3">
  {cartCount === undefined || cartCount <= 0 ? (
    <CartEmpty />
  ) : (
    <>
      <Button
        variant={"default"}
        size={"lg"}
        onClick={clearCart}
        disabled={isCheckOut}
      >
        <div className="flex items-center justify-between gap-1">
          <Trash2/>{" "}
          Limpar carrinho
        </div>
      </Button>
      <Button
        variant={"default"}
        size={"default"}
        onClick={() => RedirectToCheckout()}
        disabled={isCheckOut}
      >
        {isCheckOut ? (
          <div className="flex items-center justify-between gap-2">
            <Loader className="animate-spin 3s repeat-infinite" />{" "}
            ja é quase seu...
          </div>
        ) : (
          "Finalizar compra"
        )}
      </Button>
    </>
  )}
</div>
    </section>
  )
}