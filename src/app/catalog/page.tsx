import { Metadata } from 'next';
import s from './catalogPage.module.css';
import { CatalogProducts } from '@/components/pages/catalog/CatalogProducts/CatalogProducts';

export const metadata: Metadata = {
  title: 'Catalog | ProfStore',
  description: 'All products in our shop',
};

export default async function HomeCatalogPage() {
  return (
    <main className={s.page}>
      <h1 className={s.title}>Catalog</h1>

      <CatalogProducts />
    </main>
  );
}
