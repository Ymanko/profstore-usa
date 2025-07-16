export const runtime = 'nodejs'

import { unstable_cache } from 'next/cache'
import { cookies } from 'next/headers'
import { SHOPIFY_CHECKOUT_ID_COOKIE } from '../constants'
import { isShopifyError } from '../type-guards'
import { shopifyFetch } from './index'

import {
  getProductQuery,
  getProductsQuery,
  getProductRecommendationsQuery
} from './queries/product'

import {
  getCollectionQuery,
  getCollectionsQuery,
  getCollectionProductsQuery
} from './queries/collection'

import { getMenuQuery } from './queries/menu'
import { getPageQuery, getPagesQuery } from './queries/page'
import { getCartQuery } from './queries/cart'

import type {
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  Metafield
} from './types'

// ==== HELPERS ====

export const removeEdgesAndNodes = <T>(array: Connection<T>): T[] =>
  array.edges.map(edge => edge.node)

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images)
  return flattened.map(image => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1]
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    }
  })
}

const reshapeProduct = (
  product: ShopifyProduct,
  filterHidden = true
): Product | undefined => {
  if (!product) return undefined
  const { images, variants, ...rest } = product

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  }
}

const reshapeProducts = (products: ShopifyProduct[]) =>
  products.map(p => reshapeProduct(p)).filter(Boolean) as Product[]

export function buildPathForCollection(
  collection: Collection,
  allCollections: Collection[]
): string {
  const segments = [collection.handle]
  let current = collection

  while (current.parentId) {
    const parent = allCollections.find(c => c.id === current.parentId)
    if (!parent) break
    segments.unshift(parent.handle)
    current = parent
  }

  return '/' + segments.join('/')
}

// ==== COLLECTIONS ====

const reshapeCollection = (
  collection: ShopifyCollection
): Collection | undefined => {
  if (!collection) return undefined

  const metafields: Metafield[] =
    Array.isArray((collection.metafields as Connection<any>)?.edges)
      ? (collection.metafields as Connection<any>).edges.map((edge) => {
          const node = edge.node
          return {
            key: node.key,
            value: node.value,
            namespace: node.namespace,
            type: node.type,
            reference: node.reference
              ? {
                  id: node.reference.id,
                  handle: node.reference.handle,
                  title: node.reference.title
                }
              : undefined
          }
        })
      : []

  const parentField = metafields.find((field: Metafield) => field.key === 'parent')
  const parentId = parentField?.reference?.id || null
  const parentHandle = parentField?.reference?.handle || null

  return {
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    updatedAt: collection.updatedAt,
    seo: collection.seo,
    metafields,
    path: `/${collection.handle}`, // будет перезаписан позже
    parentId,
    parentHandle
  }
}


const reshapeCollections = (collections: ShopifyCollection[]): Collection[] =>
  collections.map(reshapeCollection).filter(Boolean) as Collection[]

export const getCollections = unstable_cache(
  async (): Promise<Collection[]> => {
    const res = await shopifyFetch<ShopifyCollectionsOperation>({
      query: getCollectionsQuery
    })

    const raw = removeEdgesAndNodes(res.body.data.collections)
    const collections = reshapeCollections(raw)

    // 🔗 Перезаписуємо path з урахуванням ієрархії
    collections.forEach(col => {
      col.path = buildPathForCollection(col, collections)
    })

    return collections
  },
  ['get-collections'],
  { revalidate: 86400 }
)

export const getCollection = unstable_cache(
  async (handle: string): Promise<Collection | undefined> => {
    const res = await shopifyFetch<ShopifyCollectionOperation>({
      query: getCollectionQuery,
      variables: { handle }
    })

    const raw = res.body.data.collection
    if (!raw) return undefined

    const reshaped = reshapeCollection(raw)
    if (!reshaped) return undefined

    const all = await getCollections()
    reshaped.path = buildPathForCollection(reshaped, all)

    return reshaped
  },
  ['get-collection'],
  { revalidate: 86400 }
)

export const getCollectionProducts = unstable_cache(
  async ({
    collection,
    reverse,
    sortKey
  }: {
    collection: string
    reverse?: boolean
    sortKey?: string
  }): Promise<Product[]> => {
    const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
      query: getCollectionProductsQuery,
      variables: { handle: collection, reverse, sortKey }
    })

    const products = res.body.data.collection?.products
    if (!products) return []

    return reshapeProducts(removeEdgesAndNodes(products))
  },
  ['get-collection-products'],
  { revalidate: 86400 }
)

// ==== PRODUCTS ====

export const getProduct = unstable_cache(
  async (handle: string): Promise<Product | undefined> => {
    const res = await shopifyFetch<ShopifyProductOperation>({
      query: getProductQuery,
      variables: { handle }
    })

    return reshapeProduct(res.body.data.product, false)
  },
  ['get-product'],
  { revalidate: 86400 }
)

export const getProducts = unstable_cache(
  async ({
    query,
    reverse,
    sortKey
  }: {
    query?: string
    reverse?: boolean
    sortKey?: string
  }): Promise<Product[]> => {
    const res = await shopifyFetch<ShopifyProductsOperation>({
      query: getProductsQuery,
      variables: { query, reverse, sortKey }
    })

    return reshapeProducts(removeEdgesAndNodes(res.body.data.products))
  },
  ['get-products'],
  { revalidate: 86400 }
)

// ==== PAGES ====

export const getPages = unstable_cache(
  async (): Promise<Page[]> => {
    const res = await shopifyFetch<ShopifyPagesOperation>({
      query: getPagesQuery
    })

    return removeEdgesAndNodes(res.body.data.pages)
  },
  ['get-pages'],
  { revalidate: 86400 }
)

export const getPage = unstable_cache(
  async (handle: string): Promise<Page> => {
    const res = await shopifyFetch<ShopifyPageOperation>({
      query: getPageQuery,
      variables: { handle }
    })

    return res.body.data.pageByHandle
  },
  ['get-page'],
  { revalidate: 86400 }
)

// ==== MENU ====

export const getMenu = unstable_cache(
  async (handle: string): Promise<Menu[]> => {
    const res = await shopifyFetch<ShopifyMenuOperation>({
      query: getMenuQuery,
      variables: { handle }
    })

    return (
      res.body.data.menu?.items.map((item: { title: string; url: string }) => ({
        title: item.title,
        path: item.url
          .replace(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '', '')
          .replace('/collections', '')
          .replace('/pages', '')
      })) || []
    )
  },
  ['get-menu'],
  { revalidate: 86400 }
)

// ==== CART ====

export async function getCart(): Promise<Cart | undefined> {
  try {
    const cookieStore = await cookies()
    const checkoutId = cookieStore.get(SHOPIFY_CHECKOUT_ID_COOKIE)?.value
    if (!checkoutId) return undefined

    const res = await shopifyFetch<ShopifyCartOperation>({
      query: getCartQuery,
      variables: { cartId: checkoutId }
    })

    const cart = res.body.data.cart
    if (!cart) return undefined

    return {
      ...cart,
      lines: removeEdgesAndNodes(cart.lines)
    }
  } catch (e) {
    if (isShopifyError(e)) return undefined
    throw e
  }
}
