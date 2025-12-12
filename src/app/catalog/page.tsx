import { CatalogProducts } from '@/components/pages/catalog/CatalogProducts/CatalogProducts';
import { Typography } from '@/components/ui/Typography';

import s from './catalogPage.module.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog | ProfStore',
  description: 'All products in our shop',
};

export default async function CatalogPage() {
  return (
    <section className={s.page}>
      <Typography variant='h1'>Catalog</Typography>

      <CatalogProducts />
    </section>
  );
}
