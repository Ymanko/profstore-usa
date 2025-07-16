import { NextRequest, NextResponse } from 'next/server';

const shop = 'profstore-usa.myshopify.com';
const accessToken = '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';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const response = await fetch(`https://${shop}/admin/api/2024-01/products.json`, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}