import { getProducts } from "@/app/api/route"
import ProductCard from "@/components/shop/productCard"

export default async function ProductList() {
  const products = await getProducts()
   return (
    <section className="grid gap-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {
        products?.map((p) => (
          <ProductCard {...p} key={p.id}/>
        ))
      }
    </section>
   )
}