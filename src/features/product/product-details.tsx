'use client';

export function ProductDetails({ handle }: { handle: string }) {
  return (
    <div className='container'>
      <h1 className='text-3xl font-bold'>{handle}</h1>
    </div>
  );
}
