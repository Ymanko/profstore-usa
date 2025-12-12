'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import Image from 'next/image';

const GET_PRODUCT = gql`
  query GetProduct($handle: String!) {
    product(handle: $handle) {
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

type ProductQueryResponse = {
  product: Product | null;
};

type ProductQueryVariables = {
  handle: string;
};

export const ProductView = ({ handle }: { handle: string }) => {
  const { data, loading, error } = useQuery<ProductQueryResponse, ProductQueryVariables>(GET_PRODUCT, {
    variables: { handle },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;
  if (!data?.product) return <h1>Product not found</h1>;

  const product = data.product;

  return (
    <div>
      <h1>{product.title}</h1>

      {product.featuredImage && (
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || product.title}
          width={600}
          height={600}
        />
      )}

      <p>{product.description}</p>
    </div>
  );
};
