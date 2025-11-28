import { Metadata } from 'next';
import s from './catalogPage.module.css';

export const metadata: Metadata = {
  title: 'Catalog | ProfStore',
  description: 'All products in our shop',
};

export default async function HomeCatalogPage() {
  // const products = await getProducts(50);

  return (
    <main className={s.page}>
      <h1 className={s.title}>Catalog</h1>

      <div className={s.grid}>
        {/*{products.map((product: any) => (*/}
        {/*  <div key={product.id} className={s.card}>*/}
        {/*    {product.featuredImage && (*/}
        {/*      <Image*/}
        {/*        src={product.featuredImage.url}*/}
        {/*        alt={product.title}*/}
        {/*        width={400}*/}
        {/*        height={600}*/}
        {/*        className={s.image}*/}
        {/*      />*/}
        {/*    )}*/}

        {/*    <h2 className={s.productTitle}>{product.title}</h2>*/}

        {/*    <p className={s.description}>{product.description}</p>*/}

        {/*    <a href={`/catalog/${product.handle}`} className={s.link}>*/}
        {/*      View product →*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
    </main>
  );
}
