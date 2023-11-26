import Image from "next/image";
import EmptyCart from "@/assets/empty_cart.svg"
import Link from "next/link";

export function CartEmpty(){
  return(
    <>
      <div className="flex flex-col items-center justify-center mt-2">
        <Image src={EmptyCart} width={300} height={300} alt="Carrinho vazio"/>
        <h1 className="md:text-4xl lg:text-4xl text-lg  font-bold text-emerald-700 mb-2">Seu carrinho esta vazio</h1>
        <span className="text-center text-sm md:text-sm lg:text-lg font-light text-emerald-900 mb-4 lg:w-1/2">
          Sabe como encher o seu carrinho? Se <span className="text-red-400">não</span> clique no botão <span className="text-emerald-600">verde</span> abaixo
          para adicionar suas <span className="underline">bebibas favoritas</span> ao carrinho e <span className="font-medium text-emerald-950">você</span> nosso querido cliente 
          aproveitar as promocões de nossos produtos exclusivos 
        </span>
        <button className="text-lg font-medium bg-emerald-500 text-white/90 px-4 py-2 rounded-xl">
          <Link href={'/'}>
            Ir para catalogo das bebibdas
          </Link>
        </button>
      </div>
    </>
  )
}