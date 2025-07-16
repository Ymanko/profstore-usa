import { NextResponse } from 'next/server'
import { shopifyFetch, removeEdgesAndNodes } from '@/lib/shopify'
import { getCollectionsQuery } from '@/lib/shopify/queries/collection'
import { buildPathForCollection } from '@/lib/shopify/server'
import type {
  ShopifyCollectionsOperation,
  ShopifyCollection,
  Collection,
  Metafield
} from '@/lib/shopify/types'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await shopifyFetch<ShopifyCollectionsOperation>({
      query: getCollectionsQuery
    })

    const rawCollections = removeEdgesAndNodes(res.body.data.collections)

    // Шаг 1: вытягиваем минимальные данные и родительские ссылки
    const tempCollections: Collection[] = rawCollections.map((col: ShopifyCollection) => {
      const metafields: Metafield[] = Array.isArray(col.metafields)
        ? col.metafields.map((node) => ({
            key: node?.key ?? '',
            value: node?.value ?? '',
            namespace: node?.namespace ?? '',
            type: node?.type ?? '',
            reference: node?.reference
              ? {
                  id: node.reference.id,
                  handle: node.reference.handle,
                  title: node.reference.title
                }
              : undefined
          }))
        : []

      const parentField = metafields.find((m) => m.key === 'parent')
      const parentId = parentField?.reference?.id || null
      const parentHandle = parentField?.reference?.handle || null

      return {
        id: col.id,
        handle: col.handle,
        title: col.title,
        description: col.description,
        updatedAt: col.updatedAt,
        seo: col.seo,
        metafields,
        parentId,
        parentHandle,
        path: '' // будет установлено ниже
      }
    })

    // Шаг 2: создаём вложенные path через buildPathForCollection
    const collections = tempCollections.map((col) => ({
      ...col,
      path: buildPathForCollection(col, tempCollections)
    }))

    return NextResponse.json(collections)
  } catch (error) {
    console.error('❌ Error in /api/collections:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
