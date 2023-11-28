import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import stripe  from "@/lib/stripe";
import  { validateCartItems } from "use-shopping-cart/utilities"
import { Product } from "use-shopping-cart/core"

export async function POST(request: NextRequest) {
  const cartDetails =  await request.json();
  const baseUrl = process.env.VERCEL_URL
  
  const stripeInventory = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = stripeInventory.data.map((p: Stripe.Product): Product => {
    return {
      id: p.id.toString(),
      name: p.name,
      description: p.description ?? "...",
      price: Number((p.default_price as Stripe.Price)?.unit_amount_decimal ?? '0'),
      currency: (p.default_price as Stripe.Price)?.currency ?? 'BRL',
      images: p.images,
      image: p.images[0],
    }
  })

  const line_items = validateCartItems(products, cartDetails);
  console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",

    payment_method_types: ["card","boleto"],
    invoice_creation: {
      enabled: true,
      invoice_data: {
        metadata: {
          email: cartDetails.email
        },
        description: 'Drinkify',
        footer: 'Todos os direitos reservados para Drinkify',
      }
    },
    phone_number_collection: {
      enabled: true
    },
    success_url: `${baseUrl}/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cart`,
    allow_promotion_codes: true
  })

  return NextResponse.json(session,  );
}