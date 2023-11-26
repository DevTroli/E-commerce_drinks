import  stripe  from "@/lib/stripe"
import Stripe from "stripe"


export async function dataProducts() {
  await stripe.products.list().then(async (product: any) => {
    try{
      const productCreated = await stripe.products.create(product)
      console.log("STRIPE_CREATE_SUCCESS", productCreated.name)
    }
    catch(e: any){
      console.log("STRIPE_CREATE_ERROR", e.message)
    }
  })
}

export async function getProducts() {
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

