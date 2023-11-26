import ProductCard from "@/components/shop/productCard"
import stripe from "@/lib/stripe"
import Stripe from "stripe"

async function getProducts() {
  try{
    const StripeProducts = await stripe.products.list({
      expand: ['data.default_price'],
    })
    console.log(StripeProducts)
    return StripeProducts.data.map((p:Stripe.Product) => {
      return {
        id: p.id.toString(),
        name: p.name,
        description: p.description ?? '',
        price: (p.default_price as Stripe.Price).unit_amount_decimal ?? '0',
        currency: (p.default_price as Stripe.Price)?.currency ?? 'BRL',
        images: p.images,
        image: p.images[0],
      }
    })
  }catch(e: any) {
    console.log("Stripe deu erro olha lá hein", e.message)
  }
}

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