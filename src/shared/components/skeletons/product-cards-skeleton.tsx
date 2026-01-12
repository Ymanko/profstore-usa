export function ProductCardsSkeleton() {
  return (
    <div className='container space-y-5 py-12'>
      <div className='bg-muted-primary/50 h-9 animate-pulse rounded-lg' />

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {[1, 2].map(i => (
          <div key={i} className='bg-muted-primary/50 h-96 animate-pulse rounded-lg' />
        ))}
      </div>
    </div>
  );
}
