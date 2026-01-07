/**
 * Calculate discount percentage between old and new price
 *
 * @param oldPrice - Original price
 * @param newPrice - Discounted price
 * @returns Discount percentage rounded to nearest integer
 *
 * @example
 * calculateDiscountPercentage(100, 80) // Returns 20
 * calculateDiscountPercentage(50, 25) // Returns 50
 */
export function calculateDiscountPercentage(oldPrice: number, newPrice: number): number {
  if (oldPrice === 0) return 0;
  const percentPerPrice = (newPrice * 100) / oldPrice;
  return Math.round(100 - percentPerPrice);
}
