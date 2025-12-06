'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { Icon } from '@/components/ui/Icon/Icon';
import { AppContainer } from '@/components/common/AppContainer/AppContainer';
import { DesktopUserActionsList } from './components/DesktopUserActionsList/DesktopUserActionsList';

import s from './styles.module.scss';

interface Product {
  title: string;
  handle: string;
  imageUrl?: string;
}

interface Collection {
  id: string;
  handle: string;
  title: string;
  products: Product[];
}

interface ImageNode {
  url: string;
  altText: string;
}

interface ProductNode {
  id: string;
  handle: string;
  title: string;
  featuredImage?: ImageNode | null;
}

interface CollectionNode {
  id: string;
  handle: string;
  title: string;
  products: {
    edges: {
      node: ProductNode;
    }[];
  };
}

interface GetCollectionsData {
  collections: {
    edges: {
      node: CollectionNode;
    }[];
  };
}

const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(first: 5) {
      edges {
        node {
          id
          handle
          title
          products(first: 3) {
            edges {
              node {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const MiddleNav = () => {
  const [productCollections, setProductCollections] = useState<
    Collection[] | undefined
  >(undefined);

  const { loading, error, data } =
    useQuery<GetCollectionsData>(GET_COLLECTIONS);

  const handleCatalogClick = () => {
    if (loading) {
      console.info('Коллекции еще загружаются...');
      return;
    }

    if (error) {
      console.error('Ошибка загрузки коллекций:', error.message);
      return;
    }

    if (data?.collections?.edges.length) {
      const collections: Collection[] = data.collections.edges.map((edge) => {
        const collectionNode: CollectionNode = edge.node;

        const productsList: Product[] = collectionNode.products.edges.map(
          (pEdge) => ({
            title: pEdge.node.title,
            handle: pEdge.node.handle,
            imageUrl: pEdge.node.featuredImage?.url,
          }),
        );

        return {
          id: collectionNode.id,
          handle: collectionNode.handle,
          title: collectionNode.title,
          products: productsList,
        };
      });

      setProductCollections(collections);
    } else {
      console.info('Коллекции не найдены (пустой результат запроса).');
    }
  };

  console.info('Успешно загруженные коллекции Shopify:', productCollections);
  return (
    <div className={s.headerMiddle}>
      <AppContainer classes={s.headerMiddleContainer}>
        <Link href={'/catalog'} className={s.logoLink}>
          <Image
            src={'/img/profstore-logo.png'}
            alt={'Profstore logo'}
            width={141}
            height={66}
          />
        </Link>
        <DesktopUserActionsList />
        <div className={s.searchContainer}>
          <button
            className={s.catalogBtn}
            onClick={handleCatalogClick}
            disabled={loading}
          >
            <Icon name="viewGrid" width={24} height={24} />
            Catalog
          </button>
          <form>
            <div className={s.inputWrap}>
              <label htmlFor="search" className="visuallyHidden">
                Search products
              </label>

              <input
                id="search"
                type="text"
                placeholder="Search products..."
                className={s.searchInput}
              />

              <div className={s.iconWrap}>
                <Icon
                  className={s.searchIcon}
                  name="search"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </form>
        </div>
      </AppContainer>
    </div>
  );
};
