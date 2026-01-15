export function calculateDiscountPercentage(oldPrice: number, newPrice: number): number {
  if (oldPrice === 0) return 0;

  const percentPerPrice = (newPrice * 100) / oldPrice;
  return Math.round(100 - percentPerPrice);
}
