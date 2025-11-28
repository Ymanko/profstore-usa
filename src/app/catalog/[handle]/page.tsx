import s from './productPage.module.css';

type Props = {
  params: {
    params: Promise<{ handle: string }>;
  };
};

export default async function ProductPage({ params }: Props) {
  const handle = await params;

  // const product = await getProduct(handle.handle);
  // console.log('product', product);
  // if (!product) {
  return <h1>Product not found</h1>;
  // }

  return <main className={s.page}>{/*<h1>{product.title}</h1>*/}</main>;
}
