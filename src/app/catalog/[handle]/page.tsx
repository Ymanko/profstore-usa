import { ProductView } from '@/components/pages/Product/ProductInfo';

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: Props) {
  const handleParams = await params;

  return <ProductView handle={handleParams.handle} />;
}
