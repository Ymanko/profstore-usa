export const runtime = 'nodejs'

import { getCollection } from '@/lib/shopify/server'
import type { Metadata } from 'next'

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const handle = slug?.at(-1)
  if (!handle) return {}

  const collection = await getCollection(handle)
  if (!collection) return {}

  return {
    title: collection.seo?.title || collection.title,
    description: collection.seo?.description || collection.description,
    alternates: {
      canonical: collection.path
    },
    openGraph: {
      title: collection.seo?.title || collection.title,
      description: collection.seo?.description || collection.description,
      url: collection.path
    }
  }
}

export default function CollectionLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
