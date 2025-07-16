import { getProductsQuery } from './queries/product'
import { shopifyFetch } from './shopifyFetch'
import { getProductQuery } from './queries/product'

export async function getProduct(handle: string) {
  const { body } = await shopifyFetch({
    query: getProductQuery,
    variables: { handle }
  })

  return body.data.product
}

export async function getProducts() {
  const { body } = await shopifyFetch({
    query: getProductsQuery,
    variables: {
      sortKey: 'CREATED_AT',
      reverse: true,
      query: ''
    }
  })

  return body.data.products.edges.map((edge: any) => edge.node)
}
