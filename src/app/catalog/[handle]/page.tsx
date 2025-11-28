type Props = {
  params: {
    params: Promise<{ handle: string }>;
  };
};

export default async function ProductPage({ params }: Props) {
  // const handle = await params;
  console.error('params', params);
  // const product = await getProduct(handle.handle);
  // console.log('product', product);
  return <h1>Product not found</h1>;
}
