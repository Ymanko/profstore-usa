import { getProducts } from '../../../../lib/shopify';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get('q');

  if (!searchTerm) {
    return NextResponse.json({ products: [] });
  }

  const products = await getProducts({ query: searchTerm });
  return NextResponse.json({ products });
}