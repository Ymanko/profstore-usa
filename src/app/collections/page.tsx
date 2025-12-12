import { AppContainer } from '@/components/common/AppContainer/AppContainer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog | ProfStore',
  description: 'All products in our shop',
};

export default async function CollactionsPage() {
  return (
    <AppContainer>
      <div style={{ fontSize: '32px', padding: '100px 0' }}>This is a temporary page Collections</div>
    </AppContainer>
  );
}
