"use client"
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

export function Cart() {

  const { formattedTotalPrice  } = useShoppingCart()

  return <div className="flex items-center justify-center space-x-3 ">
            <Link href={'/cart'} className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              <span>{formattedTotalPrice}</span>
            </Link>
          </div>
}
  