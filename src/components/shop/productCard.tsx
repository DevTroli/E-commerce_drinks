"use client"

import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: string | number
  currency: string
  image: string
  images: string[]
}


export default function ProductCard({
  id,
  name,
  description,
  price,
  currency,
  image,
  images,
}: ProductCardProps) {

  const { addItem } = useShoppingCart()
  const { toast } = useToast()

  const formattedPrice = formatCurrencyString({
    currency: currency,
    value: Number(price),
    language: "pt-BR",
  })

  async function AddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    addItem({
      name,
      description,
      id,
      price: Number(price),
      image,
      currency
    })

    toast({
      title: `🎉 ${name} adicionado ao carrinho 🎉`,
      description: `Muito obrigado por comprar ${name} conosco e acreditar em nosso trabalho na Drinkify`,
    })
      console.log("Adicionado ao carrinho")

  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-center justify-center flex min-h-[1.5rem]">{name}</CardTitle>
          <CardDescription className="relative w-full h-60">
            <Image src={image} alt={name} fill sizes="100%" className="w-full h-full object-cover shadow-xl rounded-xl " />
          </CardDescription>
        </CardHeader>
      <CardContent className="flex items-center justify-center">
          <p className="min-h-[6rem]">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center flex-col lg:flex-row gap-2 lg:justify-between">
          <div>
            <p>Valor:</p>
            <p>{formattedPrice}</p>
          </div>
          <Button variant={"default"} size={"lg"} onClick={AddToCart}>Comprar</Button>
      </CardFooter>
    </Card>
    </>
  )
}