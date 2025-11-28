'use client';

import Image from 'next/image';
import { gql } from '@apollo/client';
import s from './catalogProducts.module.css';
import { useQuery } from '@apollo/client/react';

const GET_PRODUCTS = gql`
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
};

type ProductsQueryResponse = {
  products: {
    edges: { node: Product }[];
  };
};

type ProductsQueryVariables = {
  first: number;
};

export function CatalogProducts() {
  const { data, loading, error } = useQuery<
    ProductsQueryResponse,
    ProductsQueryVariables
  >(GET_PRODUCTS, {
    variables: { first: 50 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const products = data!.products.edges.map((e) => e.node);

  return (
    <div className={s.container}>
      {products.map((product) => (
        <div key={product.id} className={s.card}>
          {product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              width={300}
              height={400}
              className={s.image}
            />
          )}

          <h2 className={s.title}>{product.title}</h2>

          <p className={s.description}>{product.description}</p>

          <a href={`/catalog/${product.handle}`} className={s.link}>
            View product →
          </a>
        </div>
      ))}
    </div>
  );
}
