import { NextResponse } from 'next/server';
import { getMenu } from 'lib/shopify/server';
import { Menu } from 'lib/shopify/types';

export async function GET() {
  try {
    const menu: Menu[] = await getMenu('main-menu'); // або інший handle, якщо у вас інший
    return NextResponse.json(menu);
  } catch (error) {
    console.error('Menu fetch failed:', error);
    return new NextResponse('Failed to load menu', { status: 500 });
  }
}