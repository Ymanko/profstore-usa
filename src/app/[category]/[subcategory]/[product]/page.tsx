import { TransitionLayout } from '@/features/layout/transition-layout';
import { PageWrapper } from '@/shared/components/common/page-wrapper';

interface ProductPageProps {
  params: Promise<{
    product: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;

  return (
    <TransitionLayout>
      <PageWrapper>
        <div className='container'>
          <h1 className='text-3xl font-bold'>C{product}</h1>

          {/* Product details would be fetched and displayed here */}
        </div>
      </PageWrapper>
    </TransitionLayout>
  );
}
