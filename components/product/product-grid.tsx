'use client'

import React from 'react'
import { Product } from '@/lib/shopify/types'
import Image from 'next/image'
import Link from 'next/link'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Товари не знайдено</p>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <Link
          key={product.handle}
          href={`/${product.handle}`}
          className="group border rounded-lg overflow-hidden hover:shadow-md transition"
        >
          <div className="relative w-full h-48">
            {product.images?.[0]?.url && (
              <Image
                src={product.images[0].url}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 20vw"
              />
            )}
          </div>
          <div className="p-2">
            <h3 className="text-sm font-medium group-hover:text-green-600 transition">
              {product.title}
            </h3>
            {product.variants?.[0]?.price && (
              <p className="text-sm text-gray-700">
                ${product.variants[0].price.amount}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
