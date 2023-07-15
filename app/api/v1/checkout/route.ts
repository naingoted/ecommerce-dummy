import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { CartProduct } from '@/types';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
	const { products } = await req.json();

	if (!products || products.length === 0) {
		return new NextResponse('Product infos are required', { status: 400 });
	}

	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
	products.forEach((product: CartProduct) => {
		line_items.push({
			quantity: product.quantity,
			price_data: {
				currency: 'USD',
				product_data: {
					name: product.title,
				},
				unit_amount: product.price * product.quantity,
			},
		});
	});
	console.log('line items ', line_items);
	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: 'payment',
		billing_address_collection: 'required',
		phone_number_collection: {
			enabled: true,
		},
		success_url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/cart?success=1`,
		cancel_url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/cart?canceled=1`,
		metadata: {
			orderId: 1,
		},
	});

	console.log('hello', session);

	return NextResponse.json(
		{ url: session.url },
		{
			headers: corsHeaders,
		}
	);
}
