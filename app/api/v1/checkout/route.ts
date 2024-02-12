import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { CartProduct } from "@/types";
import { getUrlbyEnv } from "@/lib/utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const { products } = await req.json();

  if (!products || products.length === 0) {
    return new NextResponse("Product infos are required", { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  products.forEach((product: CartProduct) => {
    line_items.push({
      quantity: product.quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * product.quantity,
      },
    });
  });

  const appUrl = getUrlbyEnv(process.env.NEXT_PUBLIC_VERCEL_URL);
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${appUrl}/cart?success=1`,
    cancel_url: `${appUrl}/cart?canceled=1`,
    metadata: {
      orderId: 1,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
