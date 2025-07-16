import { getCollections } from '@/lib/shopify/server'
import Link from 'next/link'

export const metadata = {
  title: 'Catalog | Profstore',
  description: 'Browse all categories available in our catalog'
}

export default async function CatalogPage() {
  const collections = await getCollections()

  const rootCollections = collections.filter((col) => {
    const metafields = Array.isArray(col.metafields) ? col.metafields : []
    const parentField = metafields.find((m) => m.key === 'parent')
    return !parentField?.value?.trim()
  })

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Каталог</h1>

      {rootCollections.length === 0 ? (
        <p className="text-gray-600">Немає категорій</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {rootCollections.map((col) => (
            <li key={col.handle}>
              <Link
                href={`/collections/${col.handle}`}
                className="block border rounded-lg overflow-hidden hover:shadow-md transition p-4 text-center bg-white"
              >
                <img
                  src={col.image ?? '/placeholder.jpg'}
                  alt={col.title}
                  className="w-full h-28 object-contain mb-3 bg-white"
                />
                <h2 className="text-base font-semibold text-gray-800">{col.title}</h2>
                {col.description && (
                  <p className="text-xs text-gray-500 mt-1">{col.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
