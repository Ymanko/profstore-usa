export const runtime = 'nodejs'

import { notFound } from 'next/navigation'
import { getCollection, getCollectionProducts, getCollections } from '@/lib/shopify/server'
import ProductGrid from '@/components/product/product-grid'
import Link from 'next/link'
import type { Collection } from '@/lib/shopify/types'

export async function generateStaticParams() {
  const collections = await getCollections()

  return collections.map((collection) => ({
    slug: collection.path.replace(/^\/+/, '').split('/')
  }))
}

export default async function CollectionPage({
  params
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const handle = slug?.at(-1)
  if (!handle) return notFound()

  const collection = await getCollection(handle)
  if (!collection) return notFound()

  const allCollections: Collection[] = await getCollections()

  const subCollections = allCollections.filter(
    (c) => c.parentId === collection.id
  )

  const products = await getCollectionProducts({ collection: handle })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{collection.title}</h1>

      {subCollections.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
          {subCollections.map((sub) => (
            <Link
              key={sub.id}
              href={sub.path}
              className="block border rounded-md p-4 text-center hover:shadow transition"
              title={sub.title}
            >
              {sub.title}
            </Link>
          ))}
        </div>
      )}

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-gray-500">Наразі немає товарів у цій категорії.</p>
      )}
    </div>
  )
}
